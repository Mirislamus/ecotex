<?php
    $msg = '';
    
    function check($item) {
        return ( isset($item) && !empty(trim($item)) );
    }


    if (check($_POST["orgname"])) {
        $msg .= 'Название организации: ' . $_POST["orgname"] . '<br>';
    }

    if (check($_POST["name"])) {
        $msg .= 'Меня зовут: ' . $_POST["name"] . '<br>';
    }
        
    if (check($_POST["phone"])) {
        $msg .= 'Телефон: ' . $_POST["phone"] . '<br>';
    }
        
    if (check($_POST["email"])) {
        $msg .= 'Email: ' . $_POST["email"] . '<br>';
    }

    if (check($_POST["message"])) {
        $msg .= 'Сообщение: ' . $_POST["message"] . '<br>';
    }
        

    $to = "3472999084@mail.ru";
    $subject = "Заказ звонка с сайта";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: <robot@bbstroy.ru>\r\n";


    $send = mail($to, $subject, $msg, $headers);
    
    echo $msg;
?>
