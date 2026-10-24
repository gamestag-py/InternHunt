
<?php
// php/skills.php

session_start();

header("Content-Type: application/json; charset=UTF-8");

// If your frontend and PHP backend use different origins,
// configure the exact frontend origin here.
$allowedOrigin = "http://localhost";
$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

if ($origin === $allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header("Access-Control-Allow-Credentials: true");
    header("Vary: Origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/db.php";

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Require an authenticated user.
$userId = $_SESSION["user_id"] ?? null;

if (!$userId) {
    respond(401, [
        "success" => false,
        "message" => "Please log in first."
    ]);
}

$method = $_SERVER["REQUEST_METHOD"];

// Fetch skills.
if ($method === "GET") {
    $stmt = $conn->prepare(
        "SELECT skills FROM skills WHERE user_id = ? LIMIT 1"
    );

    $stmt->bind_param("i", $userId);
    $stmt->execute();

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    $skills = [];

    if ($row && !empty($row["skills"])) {
        $decoded = json_decode($row["skills"], true);

        if (is_array($decoded)) {
            $skills = $decoded;
        } else {
            // Support existing comma-separated skill data.
            $skills = explode(",", $row["skills"]);
        }
    }

    $skills = array_values(array_unique(array_filter(
        array_map(
            fn($skill) => trim((string) $skill),
            $skills
        ),
        fn($skill) => $skill !== ""
    )));

    respond(200, [
        "success" => true,
        "skills" => $skills
    ]);
}

// Save the complete skills array.
if ($method === "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!is_array($input) || !isset($input["skills"]) ||
        !is_array($input["skills"])) {
        respond(400, [
            "success" => false,
            "message" => "A skills array is required."
        ]);
    }

    $skills = [];

    foreach ($input["skills"] as $skill) {
        if (!is_string($skill)) {
            continue;
        }

        $skill = trim($skill);

        if ($skill === "") {
            continue;
        }

        if (mb_strlen($skill) > 100) {
            respond(400, [
                "success" => false,
                "message" => "Each skill must be 100 characters or fewer."
            ]);
        }

        $skills[] = $skill;
    }

    // Remove duplicates without case sensitivity.
    $uniqueSkills = [];
    $seen = [];

    foreach ($skills as $skill) {
        $key = mb_strtolower($skill);

        if (!isset($seen[$key])) {
            $seen[$key] = true;
            $uniqueSkills[] = $skill;
        }
    }

    $skillsJson = json_encode(
        $uniqueSkills,
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );

    if ($skillsJson === false) {
        respond(500, [
            "success" => false,
            "message" => "Could not encode skills."
        ]);
    }

    $stmt = $conn->prepare(
        "INSERT INTO skills (user_id, skills)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE skills = VALUES(skills)"
    );

    $stmt->bind_param("is", $userId, $skillsJson);
    $stmt->execute();
    $stmt->close();

    respond(200, [
        "success" => true,
        "message" => "Skills saved successfully.",
        "skills" => $uniqueSkills
    ]);
}

header("Allow: GET, POST, OPTIONS");

respond(405, [
    "success" => false,
    "message" => "Method not allowed."
]);
