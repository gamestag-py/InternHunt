
<?php
session_start();

header("Content-Type: application/json; charset=utf-8");

require_once __DIR__ . "/db.php";
require_once dirname(__DIR__) . "/vendor/autoload.php";

function respond(int $status, array $data): void
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    respond(405, [
        "success" => false,
        "error" => "POST required."
    ]);
}

$userId = $_SESSION["user_id"] ?? $_SESSION["user"]["id"] ?? null;

if (!$userId) {
    respond(401, [
        "success" => false,
        "error" => "Please log in first."
    ]);
}

if (!isset($conn) || !($conn instanceof mysqli)) {
    respond(500, [
        "success" => false,
        "error" => "Database connection is not configured correctly."
    ]);
}

// Fetch the logged-in user's resume path.
$stmt = $conn->prepare(
    "SELECT resume_url FROM users WHERE id = ? LIMIT 1"
);
$stmt->bind_param("i", $userId);
$stmt->execute();
$user = $stmt->get_result()->fetch_assoc();
$stmt->close();

if (!$user || empty($user["resume_url"])) {
    respond(404, [
        "success" => false,
        "error" => "No resume URL found. Upload a resume first."
    ]);
}

$projectRoot = realpath(dirname(__DIR__));

if ($projectRoot === false) {
    respond(500, [
        "success" => false,
        "error" => "Project directory could not be resolved."
    ]);
}

$storedUrl = trim($user["resume_url"]);
$urlPath = parse_url($storedUrl, PHP_URL_PATH);

if ($urlPath === false || $urlPath === null || $urlPath === "") {
    $urlPath = $storedUrl;
}

$urlPath = str_replace("\\", "/", $urlPath);
$urlPath = rawurldecode($urlPath);

// Convert an absolute project URL/path to a project-relative path.
$marker = "/projects/internhunt/";
$position = strpos($urlPath, $marker);

if ($position !== false) {
    $relativePath = substr(
        $urlPath,
        $position + strlen($marker)
    );
} else {
    $relativePath = ltrim($urlPath, "/");
}

// Reject path traversal attempts.
$segments = explode("/", $relativePath);

if (
    in_array("..", $segments, true) ||
    strpos($relativePath, "\0") !== false
) {
    respond(400, [
        "success" => false,
        "error" => "Invalid resume path."
    ]);
}

// Check likely locations. Your uploads directory is inside php/.
$candidates = [
    $projectRoot . DIRECTORY_SEPARATOR . $relativePath,
    __DIR__ . DIRECTORY_SEPARATOR . $relativePath,
    __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR
        . basename($relativePath),
    __DIR__ . DIRECTORY_SEPARATOR . "uploads" . DIRECTORY_SEPARATOR
        . basename($urlPath)
];

$realResumePath = false;

foreach ($candidates as $candidate) {
    $resolved = realpath($candidate);

    if (
        $resolved !== false &&
        is_file($resolved) &&
        strpos(
            $resolved,
            $projectRoot . DIRECTORY_SEPARATOR
        ) === 0
    ) {
        $realResumePath = $resolved;
        break;
    }
}

if ($realResumePath === false) {
    error_log(
        "Resume not found. Stored resume_url: " . $storedUrl .
        " | Project root: " . $projectRoot
    );

    respond(404, [
        "success" => false,
        "error" => "Resume file not found.",
        "stored_resume_url" => $storedUrl,
        "expected_upload_path" =>
            "php/uploads/" . basename($urlPath)
    ]);
}

if (strtolower(pathinfo($realResumePath, PATHINFO_EXTENSION)) !== "pdf") {
    respond(415, [
        "success" => false,
        "error" => "This analyzer currently supports PDF resumes only."
    ]);
}

// Validate PDF MIME type and signature.
$finfo = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($realResumePath);
$fileHandle = fopen($realResumePath, "rb");
$pdfSignature = $fileHandle ? fread($fileHandle, 5) : false;

if ($fileHandle) {
    fclose($fileHandle);
}

if ($mimeType !== "application/pdf" || $pdfSignature !== "%PDF-") {
    respond(415, [
        "success" => false,
        "error" => "Invalid PDF file."
    ]);
}

$transactionStarted = false;

try {
    // Extract text from the PDF.
    $parser = new \Smalot\PdfParser\Parser();
    $pdf = $parser->parseFile($realResumePath);
    $resumeText = trim($pdf->getText());

    if ($resumeText === "") {
        respond(422, [
            "success" => false,
            "error" => "No text could be extracted. Scanned PDFs need OCR."
        ]);
    }

    // Skills recognized by this analyzer.
    $skillDictionary = [
        "Python", "Java", "JavaScript", "TypeScript", "PHP",
        "C++", "C#", "HTML", "CSS", "React", "Node.js",
        "Express.js", "MongoDB", "MySQL", "PostgreSQL", "SQL",
        "Git", "GitHub", "Docker", "Kubernetes", "AWS",
        "Azure", "Google Cloud", "Linux", "Flask", "Django",
        "FastAPI", "Machine Learning", "Deep Learning",
        "Artificial Intelligence", "Data Analysis", "Pandas",
        "NumPy", "TensorFlow", "PyTorch", "Scikit-learn",
        "Data Structures", "Algorithms", "REST APIs",
        "Tailwind CSS", "Bootstrap", "Redis", "Firebase",
        "CI/CD", "Jenkins", "Terraform", "Selenium",
        "Computer Vision", "OpenCV", "OOP"
    ];

    $foundSkills = [];

    foreach ($skillDictionary as $skill) {
        $pattern = '/(?<![\p{L}\p{N}])'
            . preg_quote($skill, '/')
            . '(?![\p{L}\p{N}])/iu';

        if (preg_match($pattern, $resumeText)) {
            $foundSkills[] = $skill;
        }
    }

    $foundSkills = array_values(array_unique($foundSkills));

    if (empty($foundSkills)) {
        respond(422, [
            "success" => false,
            "error" => "No recognized skills found in this resume."
        ]);
    }
$conn->begin_transaction();
$transactionStarted = true;

// Fetch the user's existing skills.
$check = $conn->prepare(
    "SELECT id, skills FROM skills WHERE user_id = ? LIMIT 1 FOR UPDATE"
);
$check->bind_param("i", $userId);
$check->execute();

$existingRow = $check->get_result()->fetch_assoc();
$check->close();

$existingSkills = [];

if ($existingRow && !empty($existingRow["skills"])) {
    $decoded = json_decode($existingRow["skills"], true);

    if (is_array($decoded)) {
        $existingSkills = $decoded;
    }
}

// Merge detected skills without removing existing ones.
$addedSkills = [];
$existingLookup = [];

foreach ($existingSkills as $skill) {
    if (is_string($skill)) {
        $existingLookup[strtolower(trim($skill))] = true;
    }
}

foreach ($foundSkills as $skill) {
    $key = strtolower(trim($skill));

    if (!isset($existingLookup[$key])) {
        $existingSkills[] = $skill;
        $existingLookup[$key] = true;
        $addedSkills[] = $skill;
    }
}

$skillsJson = json_encode(
    array_values($existingSkills),
    JSON_UNESCAPED_UNICODE
);

if ($existingRow) {
    // Update the existing user's skills record.
    $update = $conn->prepare(
        "UPDATE skills SET skills = ? WHERE id = ?"
    );
    $rowId = (int) $existingRow["id"];
    $update->bind_param("si", $skillsJson, $rowId);
    $update->execute();
    $update->close();
} else {
    // Create a record if this user has no skills row yet.
    $insert = $conn->prepare(
        "INSERT INTO skills (user_id, skills) VALUES (?, ?)"
    );
    $insert->bind_param("is", $userId, $skillsJson);
    $insert->execute();
    $insert->close();
}

$conn->commit();
$transactionStarted = false;

respond(200, [
    "success" => true,
    "message" => "Resume analyzed successfully.",
    "skills_found" => count($foundSkills),
    "skills_added" => count($addedSkills),
    "added_skills" => $addedSkills,
    "skills" => array_values($existingSkills)
]);
} catch (Throwable $e) {
    if (!empty($transactionStarted)) {
        try {
            $conn->rollback();
        } catch (Throwable $ignored) {
        }
    }

    error_log(
        "Resume analysis error: " .
        $e->getMessage() .
        " in " . $e->getFile() .
        " on line " . $e->getLine()
    );

    respond(500, [
        "success" => false,
        "error" => $e->getMessage(),
        "file" => basename($e->getFile()),
        "line" => $e->getLine()
    ]);
}