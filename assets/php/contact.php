<?php
// require ReCaptcha class
require('/home/mojopixie/smbernard.tech/assets/recaptcha/recaptcha-master/src/autoload.php');

// configure
// an email address that will be in the From field of the email.
$from = 'info@smbernard.tech';

// an email address that will receive the email with the output of the form
$sendTo = 'info@smbernard.tech';

// subject of the email
$subject = "New message from website's contact form";

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Name', 'email' => 'Email', 'phone' => 'Phone', 'message' => 'Message');

// message that will be displayed when everything is OK :)
$okMessage = '&#10024; Message sent! &#10024; <br> Thanks! I will contact you soon.';

// If something goes wrong, we will display this message.
$errorMessage = '&#10060; There was an error while submitting the form. <br> Please try again later';

// ReCaptcha Secret---Will need to replace testing key with personal secret key---ENTER_SECRET_RECPATCHA_SITEKEY
$recaptchaSecret = '6Le_9qkUAAAAAMe3CCATCywOuYelXiCcPUoAEG3v';

// let's do the sending

// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {
    if (!empty($_POST)) {

        // validate the ReCaptcha, if something is wrong, we throw an Exception,
        // i.e. code stops executing and goes to catch() block
        
        if (!isset($_POST['g-recaptcha-response'])) {
            throw new \Exception('ReCaptcha is not set.');
        }

        // do not forget to enter your secret key from https://www.google.com/recaptcha/admin
        
        $recaptcha = new \ReCaptcha\ReCaptcha($recaptchaSecret, new \ReCaptcha\RequestMethod\CurlPost());
        
        // we validate the ReCaptcha field together with the user's IP address
        
        $response = $recaptcha->verify($_POST['g-recaptcha-response'], $_SERVER['REMOTE_ADDR']);

        if (!$response->isSuccess()) {
            throw new \Exception('ReCaptcha was not validated.');
        }
        
        // everything went well, we can compose the message, as usually        
        $emailText = "Contact Form Message (smbernard.tech)\n=================================================\n";

        foreach ($_POST as $key => $value) {
            // If the field exists in the $fields array, include it in the email
            if (isset($fields[$key])) {
                $emailText .= "$fields[$key]: $value\n";
            }
        }
    
        // All the necessary headers for the email.
        $headers = array('Content-Type: text/plain; charset=iso-8859-1',
            'From: ' . $from,
            'Reply-To: ' . $from,
            'Return-Path: ' . $from,
        );
        
        // Send email
        mail($sendTo, $subject, $emailText, implode(PHP_EOL, $headers));

        $responseArray = array('type' => 'success', 'message' => $okMessage);
    }
} catch (\Exception $e) {
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
} else {
    echo $responseArray['message'];
}
