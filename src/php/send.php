<?php
    /*ПОМЕЩАЕМ ДАННЫЕ ИЗ ПОЛЕЙ В ПЕРЕМЕННЫЕ*/


    $_POST = json_decode(file_get_contents('php://input'), true);

    $data = $_POST["data"];
    $msg = '';
    
    function check($item) {
        return ( isset($item) && !empty(trim($item)) );
    }
    
    function checkArr($arr) {
        if (!isset($arr)) {
            return false;
        }
        
        $notempty = false;
        
        foreach ($arr as &$value) {
            if ( !empty($value) ) {
                $notempty = true;
            }
        }
        
        return $notempty;
    }
    
    if (checkArr($_POST["main"])) {
        $msg .= '[ Контакты ]<br><br>';

        if (check($_POST["main"]["name"])) {
            $msg .= 'Название: ' . $_POST["main"]["name"] . '<br>';
        }
        
        if (check($_POST["main"]["inn"])) {
            $msg .= 'ИНН: ' . $_POST["main"]["inn"] . '<br>';
        }
    
        
        if (check($_POST["main"]["address"])) {
            $msg .= 'Юридический адрес: ' . $_POST["main"]["address"] . '<br>';
        }
        
        if (check($_POST["main"]["postalAddress"])) {
            $msg .= 'Почтовый адрес: ' . $_POST["main"]["postalAddress"] . '<br>';
        }
        
        if (check($_POST["main"]["email"])) {
            $msg .= 'Email: ' . $_POST["main"]["email"] . '<br>';
        }
        
        if (check($_POST["main"]["phone"])) {
            $msg .= 'Телефон: ' . $_POST["main"]["phone"] . '<br>';
        }
    
        $msg .= '<br>-----<br>';
    }
    
    if (checkArr($_POST["bank"])) {
        
        $msg .= '<br>[ Банковские реквизиты ]<br><br>';
    
        if (check($_POST["bank"]["name"])) {
            $msg .= 'Наименование банка: ' . $_POST["bank"]["name"] . '<br>';
        }
        
        if (check($_POST["bank"]["account"])) {
            $msg .= 'Расчетный счет: ' . $_POST["bank"]["account"] . '<br>';
        }
        
        if (check($_POST["bank"]["bik"])) {
            $msg .= 'БИК: ' . $_POST["bank"]["bik"] . '<br>';
        }
        
        if (check($_POST["bank"]["korr"])) {
            $msg .= 'Корр.счет: ' . $_POST["bank"]["korr"] . '<br>';
        }

        $msg .= '<br>-----<br>';
    }
    
    if (checkArr($_POST["codes"])) {
        $msg .= '<br>[ Коды ]<br><br>';

        if (check($_POST["codes"]["ogrn"])) {
            $msg .= 'ОГРН: ' . $_POST["codes"]["ogrn"] . '<br>';
        }
        
        if (check($_POST["codes"]["kpp"])) {
            $msg .= 'КПП: ' . $_POST["codes"]["kpp"] . '<br>';
        }
        
        if (check($_POST["codes"]["okved"])) {
            $msg .= 'ОКВЭД: ' . $_POST["codes"]["okved"] . '<br>';
        }
        
        $msg .= '<br>-----<br>';
    }
    
    if (checkArr($_POST["director"])) {
        $msg .= '<br>[ Руководитель ]<br><br>';
        
        if (check($_POST["director"]["name"])) {
            $msg .= 'ФИО: ' . $_POST["director"]["name"] . '<br>';
        }
        
        if (check($_POST["director"]["position"])) {
            $msg .= 'Должность: ' . $_POST["director"]["position"] . '<br>';
        }
        
        if (check($_POST["director"]["phone"])) {
            $msg .= 'Телефон: ' . $_POST["director"]["phone"];
        }
        
        $msg .= '<br>-----<br>';
    }

    if (checkArr($_POST["file"])) {
        $msg .= '<br>[ Документы ]<br><br>';
        
        if (check($_POST["file"]["ustav"])) {
            $msg .= 'Устав компании: <a href="' . $_POST["file"]["ustav"] . '" target="_blank">[посмотреть]</a><br>' . $_POST["file"]["ustav"] . '<br><br>';
        }
        
        if (check($_POST["file"]["protokol"])) {
            $msg .= 'Протокол собрания: <a href="' . $_POST["file"]["protokol"] . '" target="_blank">[посмотреть]</a><br>' . $_POST["file"]["protokol"] . '<br><br>';
        }
        
        if (check($_POST["file"]["prikaz"])) {
            $msg .= 'Приказ о назначении: <a href="' . $_POST["file"]["prikaz"] . '" target="_blank">[посмотреть]</a><br>' . $_POST["file"]["prikaz"] . '<br><br>';
        }
        
        if (check($_POST["file"]["egrul"])) {
            $msg .= 'Свидетельство ЕГРЮЛ: <a href="' . $_POST["file"]["egrul"] . '" target="_blank">[посмотреть]</a> <br>' . $_POST["file"]["egrul"] . '<br><br>';
        }
    
        if (check($_POST["file"]["uchet"])) {
            $msg .= 'Свидетельство о постановке на учет: <a href="' . $_POST["file"]["uchet"] . '" target="_blank">[посмотреть]</a> <br>' . $_POST["file"]["uchet"] . '<br><br>';
        }
        
        if (check($_POST["file"]["vypiska"])) {
            $msg .= 'Выписка из ЕГРЮЛ: <a href="' . $_POST["file"]["vypiska"] . '" target="_blank">[посмотреть]</a> <br>' . $_POST["file"]["vypiska"] . ' <br><br>';
        }
        
        $msg .= '<br>-----<br>';
    }
    
    if (checkArr($_POST["wastes"])) {
        
        $waste = $_POST["wastes"];
        
        $msg .= '<br>[ Типы отходов ]<br><br>';
        
        foreach ($waste as &$value) {
            $msg .=  $value . '<br>';
        }
    }

    $to = "test@rensite.ru";
    $subject = "Новый договор с сайта";
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "From: <robot@sk-ecoteh.ru>\r\n";

    // echo $to;
    // echo "<br>";
    // echo "<br>";
    // echo $subject;
    // echo "<br>";
    // echo "<br>";
    // echo $headers;
    // echo "<br>";
    // echo "<br>";
    // echo $msg;
    $send = mail($to, $subject, $msg, $headers);
    exit('OK');