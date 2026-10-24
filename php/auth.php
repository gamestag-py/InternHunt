
<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");

require_once __DIR__ . "/db.php";

function respond(int $status, array $data): never
{
    http_response_code($status);
    echo json_encode($data);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Allow: POST");
    respond(405, ["error" => "Method not allowed."]);
}

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input)) {
    respond(400, ["error" => "Invalid JSON request."]);
}

$action = $input["action"] ?? "";
$email = $input["email"] ?? "";
$password = $input["password"] ?? "";

if (!is_string($email)) {
    respond(422, ["error" => "Invalid email address."]);
}

$email = strtolower(trim($email));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ["error" => "Enter a valid email address."]);
}

if (!is_string($password) || $password === "") {
    respond(422, ["error" => "Password is required."]);
}

try {
    if ($action === "register") {
        $name = $input["name"] ?? "";

        if (!is_string($name) || trim($name) === "" || mb_strlen(trim($name)) > 255) {
            respond(422, ["error" => "Enter a valid name."]);
        }

        $name = trim($name);

        if (strlen($password) < 8) {
            respond(422, ["error" => "Password must be at least 8 characters."]);
        }

        $stmt = $conn->prepare(
            "SELECT id FROM users WHERE email = ? LIMIT 1"
        );
        $stmt->bind_param("s", $email);
        $stmt->execute();

        if ($stmt->get_result()->num_rows > 0) {
            respond(409, ["error" => "An account with this email already exists."]);
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $conn->prepare(
            "INSERT INTO users (name, email, password_hash)
             VALUES (?, ?, ?)"
        );
        $stmt->bind_param("sss", $name, $email, $passwordHash);
        $stmt->execute();

        $userId = $conn->insert_id;

        session_regenerate_id(true);
        $_SESSION["user_id"] = $userId;

        respond(201, [
            "message" => "Account registered successfully.",
            "user" => [
                "id" => $userId,
                "name" => $name,
                "email" => $email
            ]
        ]);
    }

    if ($action === "login") {
        $stmt = $conn->prepare(
            "SELECT id, name, email, password_hash, role, resume_url
             FROM users
             WHERE email = ?
             LIMIT 1"
        );
        $stmt->bind_param("s", $email);
        $stmt->execute();

        $user = $stmt->get_result()->fetch_assoc();

        if (!$user || !password_verify($password, $user["password_hash"])) {
            respond(401, ["error" => "Invalid email or password."]);
        }

        session_regenerate_id(true);
        $_SESSION["user_id"] = (int) $user["id"];

        unset($user["password_hash"]);

        respond(200, [
            "message" => "Login successful.",
            "user" => $user
        ]);
    }

    respond(400, [
        "error" => "Action must be register or login."
    ]);

} catch (mysqli_sql_exception $e) {
    error_log($e->getMessage());

    if ((int) $e->getCode() === 1062) {
        respond(409, ["error" => "An account with this email already exists."]);
    }

    respond(500, ["error" => "A database error occurred."]);
}
