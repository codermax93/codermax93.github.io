<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['formData'])) {$formData = $_POST['formData'];}
    if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
    if (isset($_POST['name'])) {$name = $_POST['name'];}
    if (isset($_POST['email'])) {$email = $_POST['email'];}
    if (isset($_POST['messages'])) {$messages = $_POST['messages'];}
    if (isset($_POST['hiddenTimeZone'])) {$hiddenTimeZone = $_POST['hiddenTimeZone'];}

    $to = "your@email.ru"; /*Укажите ваш адрес электронной почты*/
    $headers = "Content-type: text/plain; charset = utf-8";
    $subject = "$formData";
    $message = "$formData\n\nТелефон: $phone \n\nОтправитель: $name \n\nОткуда: $email \n\nСообщение: $messages \n\nGMT: $hiddenTimeZone";
    $send = mail ($to, $subject, $message, $headers);
    // if ($send == 'OK')
    // {
    // echo "<center>Спасибо за отправку вашего сообщения! Наши специалисты свяжутся с вами в течение часа.</center>";
    // }
    // else 
    // {
    // echo "<center><b>Ошибка. Сообщение не отправлено! Проверьте правильность введенных данных</b></center>";
    // }
} else {
	echo 'OK';
}
?>