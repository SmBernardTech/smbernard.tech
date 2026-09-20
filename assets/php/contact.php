<?php
// Contact Form: Honeypot, then Turnstile, then send

// Config: Secret key lives above the web root, never in this repo
$configFile = '/home/mojopixie/turnstile-config.php';
$turnstileSecret = '';
if (is_readable($configFile)) {
    require $configFile;
}

// from: Sent as this address. Keep it on this domain so mail passes sender checks
$from = 'info@smbernard.tech';

// sendTo: Address that receives the message
$sendTo = 'info@smbernard.tech';

$subject = 'New message from website contact form';

// fields: Form field name => Label used in the email
$fields = array(
    'name' => 'Name',
    'email' => 'Email',
    'phone' => 'Phone',
    'message' => 'Message',
);

$okMessage = '&#10024; Message sent! &#10024; <br> Thanks! I will contact you soon.';
$errorMessage = '&#9760; There was an error while submitting the form. <br> Please try again later';

// Turn this off with error_reporting(0) if errors ever show up in the response
error_reporting(E_ALL & ~E_NOTICE);

// verifyTurnstile: One POST to Cloudflare, true only on a clean pass
function verifyTurnstile($secret, $token, $remoteIp)
{
    if ($secret === '' || $token === '') {
        return false;
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(array(
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $remoteIp,
    )));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $raw = curl_exec($ch);
    curl_close($ch);

    if ($raw === false) {
        return false;
    }

    $result = json_decode($raw, true);

    return isset($result['success']) && $result['success'] === true;
}

$responseArray = array('type' => 'danger', 'message' => $errorMessage);

try {
    if (!empty($_POST)) {
        // Honeypot: Hidden from people, filled in by bots. Report success so the bot moves on
        if (!empty($_POST['website'])) {
            $responseArray = array('type' => 'success', 'message' => $okMessage);
        } else {
            $token = isset($_POST['cf-turnstile-response']) ? $_POST['cf-turnstile-response'] : '';

            if (!verifyTurnstile($turnstileSecret, $token, $_SERVER['REMOTE_ADDR'])) {
                throw new \Exception('&#129302; The robot check did not pass. <br> Please reload the page and try again.');
            }

            $emailText = "Contact Form Message (smbernard.tech)\n=================================================\n";
            foreach ($_POST as $key => $value) {
                // Only the named fields go in the email, so the honeypot and token stay out
                if (isset($fields[$key])) {
                    $emailText .= "$fields[$key]: $value\n";
                }
            }

            // replyTo: Sender's address, so replying reaches them instead of this inbox.
            // Falls back to the site address if what they typed does not check out.
            // From stays on this domain either way, or the mail fails sender checks.
            $replyTo = $from;
            $senderEmail = isset($_POST['email']) ? trim($_POST['email']) : '';
            if (filter_var($senderEmail, FILTER_VALIDATE_EMAIL) && strpbrk($senderEmail, "\r\n") === false) {
                $replyTo = $senderEmail;
            }

            $headers = array(
                'Content-Type: text/plain; charset=iso-8859-1',
                'From: ' . $from,
                'Reply-To: ' . $replyTo,
                'Return-Path: ' . $from,
            );

            // Checked: A refused send must not report success to the visitor
            if (!mail($sendTo, $subject, $emailText, implode(PHP_EOL, $headers))) {
                throw new \Exception($errorMessage);
            }

            $responseArray = array('type' => 'success', 'message' => $okMessage);
        }
    }
} catch (\Exception $e) {
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    header('Content-Type: application/json');
    echo json_encode($responseArray);
} else {
    echo $responseArray['message'];
}
