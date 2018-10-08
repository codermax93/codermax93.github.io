<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $message = "";
    if (isset($_POST['formData'])) {$message .= "" . $_POST['formData'] . "\n\n";}
    if (isset($_POST['phone'])) {$message .= "Телефон:" . $_POST['phone'] . "\n\n";}
    if (isset($_POST['name'])) {$message .= "Имя:" . $_POST['name'] . "\n\n";}
    if (isset($_POST['email'])) {$message .= "Email:" . $_POST['email'] . "\n\n";}
    if (isset($_POST['messages'])) {$message .= "Сообщение:" . $_POST['messages']  . "\n\n";}
    if (isset($_POST['hiddenTimeZone'])) {$message .= "GMT:" . $_POST['hiddenTimeZone']  . "\n\n";}
    if (isset($_POST['form-subj1'])) {$message .= "Сообщение отправлено с формы 'Свяжитесь со мной'" . $_POST['form1'] . "\n\n";}
    if (isset($_POST['form-subj2'])) {$message .= "Сообщение отправлено с формы 'Рассылка'" . "\n\n";}
    if (isset($_POST['form-subj3'])) {$message .= "Сообщение отправлено с формы 'Бесплатная консультация':";}

    $to = "777@smmagic.online"; /*Укажите ваш адрес электронной почты*/
    $headers = "Content-type: text/plain; charset = utf-8";
    $subject = "$formData";
    $send = mail ($to, $subject, $message, $headers);

} else {
	echo 'OK';
}
?>

