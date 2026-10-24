
<?php
session_start();

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode(
        $data,
        JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE
    );
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "GET") {
    header("Allow: GET, OPTIONS");
    respond(405, ["error" => "Only GET requests are allowed."]);
}

if (empty($_SESSION["user_id"])) {
    respond(401, ["error" => "Please log in first."]);
}

require_once __DIR__ . "/db.php";

$userId = (int) $_SESSION["user_id"];

function parseSkills($value): array
{
    if (empty($value)) {
        return [];
    }

    if (is_array($value)) {
        $skills = $value;
    } else {
        $decoded = json_decode((string) $value, true);

        $skills = is_array($decoded)
            ? $decoded
            : explode(",", (string) $value);
    }

    $result = [];

    foreach ($skills as $skill) {
        if (!is_string($skill)) {
            continue;
        }

        $skill = trim($skill);

        if ($skill !== "") {
            $result[] = $skill;
        }
    }

    return array_values(array_unique($result));
}

function normalizeSkill(string $skill): string
{
    return mb_strtolower(
        trim(preg_replace('/\s+/', ' ', $skill)),
        "UTF-8"
    );
}

try {
    // Get logged-in user's skills.
    $stmt = $conn->prepare(
        "SELECT skills FROM skills WHERE user_id = ? LIMIT 1"
    );

    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $userRow = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    $userSkills = parseSkills($userRow["skills"] ?? "");

    $userSkillMap = [];

    foreach ($userSkills as $skill) {
        $userSkillMap[normalizeSkill($skill)] = true;
    }

    // Get internships and hackathons.
    $result = $conn->query("SELECT * FROM internships");

    $matches = [];

    while ($internship = $result->fetch_assoc()) {
        $requiredSkills = parseSkills(
            $internship["skills"] ?? ""
        );

        $matchedSkills = [];
        $missingSkills = [];

        foreach ($requiredSkills as $requiredSkill) {
            $normalized = normalizeSkill($requiredSkill);

            if (isset($userSkillMap[$normalized])) {
                $matchedSkills[] = $requiredSkill;
            } else {
                $missingSkills[] = $requiredSkill;
            }
        }

        $totalRequired = count($requiredSkills);
        $totalMatched = count($matchedSkills);
        $totalMissing = count($missingSkills);

        // Avoid division by zero when no skills are specified.
        $matchPercentage = $totalRequired > 0
            ? round(($totalMatched / $totalRequired) * 100, 2)
            : 0;

        $company = $internship["company"]
            ?? $internship["company_name"]
            ?? "Company";

        $title = $internship["title"]
            ?? $internship["role"]
            ?? $internship["job_title"]
            ?? "Internship";

        $type = strtolower(
            trim($internship["type"] ?? "internship")
        );

        if (!in_array($type, ["internship", "hackathon"], true)) {
            $type = "internship";
        }

        $matches[] = [
            "id" => (int) ($internship["id"] ?? 0),
            "type" => $type,

            "title" => $title,
            "role" => $title,
            "company" => $company,

            "description" => $internship["description"] ?? "",

            "required_skills" => $requiredSkills,
            "matched_skills" => $matchedSkills,
            "missing_skills" => $missingSkills,

            "total_required_skills" => $totalRequired,
            "total_matched_skills" => $totalMatched,
            "total_missing_skills" => $totalMissing,

            "match_percentage" => $matchPercentage,

            "location" => $internship["location"] ?? "Not specified",

            "stipend" => $internship["stipend"]
                ?? $internship["salary"]
                ?? "Not specified",

            "deadline" => $internship["deadline"]
                ?? $internship["deadline_date"]
                ?? null,

            "domain" => $internship["domain"] ?? "all",
            "register_url" => $internship["detail_url"] ?? "#",

        ];
    }

    // Sort highest match percentage first.
    usort($matches, function ($a, $b) {
        return $b["match_percentage"] <=> $a["match_percentage"];
    });

    respond(200, [
        "success" => true,

        "user_skills" => $userSkills,
        "total_user_skills" => count($userSkills),

        "total_matches" => count($matches),
        "matches" => $matches
    ]);

} catch (Throwable $e) {
    error_log(
        "Matching internships error: " . $e->getMessage()
    );

    respond(500, [
        "error" => "Unable to fetch matching internships. Check the PHP error log."
    ]);
}
