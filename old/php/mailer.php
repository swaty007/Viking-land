<?php

require_once '../vendor/autoload.php';
require_once 'recaptchalib.php';

define('MAILER_HOST', 'mail.gns-it.com');
define('MAILER_USER', 'demotest@gns-it.com');
define('MAILER_NAME', 'Catena');
define('MAILER_ENCRYPTION', 'ssl');
define('MAILER_SUBJECT', 'Contact Us');
define('MAILER_PASSWORD', 'U!xxP7m^0Qd$OVd');
define('MAILER_PORT', 465);
define('SEND_TO_EMAIL', ['andrii.fedinchyk@gns-it.com', 'maksym.yakovets@gns-it.com']);
define('CAPTCHA_SECRET_KEY', '6LdsCpoUAAAAAPhAw_8Kb7KatIIIG5Pw3lfUlzc5');

$email = $_POST['email'];
$name = $_POST['name'];
$companyName = $_POST['companyName'];
$message = $_POST['message'];
$recaptchaResponse = $_POST['g-recaptcha-response'];

if (!empty($recaptchaResponse) && !empty($email) && !empty($name)) {

    $reCaptcha = new ReCaptcha(CAPTCHA_SECRET_KEY);
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $recaptchaResponse
    );

    if ($response != null && $response->success) {
        send($email, $message, $name, $companyName);
    }
}

header('Location: ' . (isset($_SERVER["HTTPS"]) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']));

function send($email, $message, $name, $companyName)
{
    try {

        $transport = (new Swift_SmtpTransport(MAILER_HOST, MAILER_PORT, MAILER_ENCRYPTION))
            ->setUsername(MAILER_USER)
            ->setPassword(MAILER_PASSWORD);

        $mailer = new Swift_Mailer($transport);

        $body = "
            Вы получили новое письмо с формы обратной связи сайта https://catena.gns-it.com/:\n
            Имя пользователя: $name\n
            Email пользователя: $email\n
            Название компании: $companyName\n
            Сообщение: $message
        ";

        $message = (new Swift_Message(MAILER_SUBJECT))
            ->setFrom([MAILER_USER => MAILER_NAME])
            ->setTo(SEND_TO_EMAIL)
            ->setBody($body)
        ;

        $mailer->send($message);

    } catch (Exception $e) {
        echo $e->getMessage();
    }
}