<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
header('Content-Type: application/json; charset=utf-8');


$env = parse_ini_file(__DIR__ . '/.env');
$mailUser = $env['MAIL_USER'];
$mailPass = $env['MAIL_PASS'];
$mailHost = $env['MAIL_HOST'];
$mailPort = $env['MAIL_PORT'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $anrede    = htmlspecialchars($_POST["anrede"] ?? '');
  $name      = htmlspecialchars($_POST["name"] ?? '');
  $email = htmlspecialchars($_POST["email"] ?? '');
  $betreff   = htmlspecialchars($_POST["betreff"] ?? '');
  $nachricht = htmlspecialchars($_POST["nachricht"] ?? '');
  $projektTyp = ($_POST["betreff"] === "Zusammenarbeit") 
  ? htmlspecialchars($_POST["projektTyp"] ?? "") 
  : "";

  $fullMessage = "Anrede: $anrede\n";
  if ($name) $fullMessage .= "Name: $name\n";
  if ($email)       $fullMessage .= "E-Mail: $email\n";
  $fullMessage .= "Betreff: $betreff\n";
  if ($projektTyp) $fullMessage .= "Projekt-Typ: $projektTyp\n";
  $fullMessage .= "Nachricht:\n$nachricht";

  $mail = new PHPMailer(true);
  try {
    $mail->isSMTP();
    $mail->Host       = $mailHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailUser;
    $mail->Password   = $mailPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $mailPort;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($mailUser, 'Portfolio Kontaktformular');
    $mail->addAddress($mailUser); 

    $mail->Subject = "Neue Nachricht über Portfolio";
    $mail->Body    = $fullMessage;

    $mail->send();
    http_response_code(200);
    echo json_encode([
    "status" => "success",
    "message" => "Deine Nachricht wurde erfolgreich gesendet."
    ]);
    exit;

  } catch (Exception $e) {
    error_log("PHPMailer Fehler: " . $mail->ErrorInfo);
    error_log("PHP Exception: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([  
    "status" => "error",
    "message" => "E-Mail konnte nicht gesendet werden.",
    "debug" => $mail->ErrorInfo,
    "php" => $e->getMessage()
]);
exit;
  }
} else {
  http_response_code(405);
}
?>
