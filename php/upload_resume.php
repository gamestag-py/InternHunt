<?php
declare(strict_types=1);

session_start();

$allowedOrigin = 'http://localhost';
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowedOrigin) {
    header('Access-Control-Allow-Origin: ' . $allowedOrigin);
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function respond(int $status, array $body): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['error' => 'Only POST requests are allowed.']);
}

if (empty($_SESSION['user_id'])) {
    respond(401, ['error' => 'Please log in before uploading a resume.']);
}

if (!isset($_FILES['resume']) || !is_array($_FILES['resume'])) {
    respond(400, ['error' => 'Choose a resume file first.']);
}

$file = $_FILES['resume'];

if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    $messages = [
        UPLOAD_ERR_INI_SIZE => 'The file exceeds the server upload limit.',
        UPLOAD_ERR_FORM_SIZE => 'The file exceeds the allowed upload size.',
        UPLOAD_ERR_PARTIAL => 'The file was only partially uploaded.',
        UPLOAD_ERR_NO_FILE => 'Choose a resume file first.',
        UPLOAD_ERR_NO_TMP_DIR => 'The server upload directory is missing.',
        UPLOAD_ERR_CANT_WRITE => 'The server could not write the uploaded file.',
        UPLOAD_ERR_EXTENSION => 'A server extension stopped the upload.',
    ];
    $code = (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE);
    respond(400, ['error' => $messages[$code] ?? 'File upload failed.']);
}

$maxBytes = 5 * 1024 * 1024;
if (!isset($file['size']) || $file['size'] <= 0 || $file['size'] > $maxBytes) {
    respond(400, ['error' => 'Resume must be no larger than 5 MB.']);
}

$tmpPath = $file['tmp_name'] ?? '';
if (!is_uploaded_file($tmpPath)) {
    respond(400, ['error' => 'Invalid uploaded file.']);
}

$originalName = basename((string) ($file['name'] ?? ''));
$extension = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowedExtensions = ['pdf', 'docx'];
if (!in_array($extension, $allowedExtensions, true)) {
    respond(400, ['error' => 'Only PDF and DOCX resumes are allowed.']);
}

if (!class_exists('finfo')) {
    respond(500, ['error' => 'The server file validation extension is unavailable.']);
}

$finfo = new finfo(FILEINFO_MIME_TYPE);
$mime = $finfo->file($tmpPath);

$validMimeTypes = [
    'pdf' => ['application/pdf'],
    'docx' => [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'application/octet-stream',
    ],
];

if (!in_array($mime, $validMimeTypes[$extension], true)) {
    respond(400, ['error' => 'The file content does not match a supported resume format.']);
}

// Resolve the upload folder relative to this PHP endpoint.
$uploadDir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) {
    respond(500, ['error' => 'Could not create the uploads directory.']);
}

// Do not allow uploaded files to overwrite another file or expose the original filename.
$filename = bin2hex(random_bytes(16)) . '.' . $extension;
$destination = $uploadDir . $filename;
$relativePath = 'uploads/' . $filename;

if (!move_uploaded_file($tmpPath, $destination)) {
    respond(500, ['error' => 'Could not save the uploaded resume.']);
}

try {
    require_once __DIR__ . '/db.php';

    if (!isset($conn) || !($conn instanceof mysqli)) {
        throw new RuntimeException('Database connection is unavailable.');
    }

    $userId = (int) $_SESSION['user_id'];

    $stmt = $conn->prepare('UPDATE users SET resume_url = ? WHERE id = ?');
    $stmt->bind_param('si', $relativePath, $userId);
    $stmt->execute();
    $stmt->close();

    // If affected_rows is zero, the value may simply be unchanged; verify the user exists.
    $check = $conn->prepare('SELECT id FROM users WHERE id = ? LIMIT 1');
    $check->bind_param('i', $userId);
    $check->execute();
    $check->store_result();
    $userExists = $check->num_rows === 1;
    $check->close();

    if (!$userExists) {
        throw new RuntimeException('Authenticated user record was not found.');
    }
} catch (Throwable $e) {
    if (is_file($destination)) {
        unlink($destination);
    }
    error_log('Resume upload failed: ' . $e->getMessage());
    respond(500, ['error' => 'Resume was uploaded but could not be linked to your account.']);
}

respond(200, [
    'message' => 'Resume uploaded successfully.',
    'resume_url' => $relativePath,
    'filename' => $originalName,
    'size' => (int) $file['size'],
]);
