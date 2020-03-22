<?php
    $data = json_decode(file_get_contents('php://input'), true);

    $crl = curl_init();
    $url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party';
    $inn = $data['inn'];
    
    $headr = array();
    $headr[] = 'Content-Type: application/json';
    $headr[] = 'Accept: application/json';
    $headr[] = 'Authorization: Token 3258c8d2815cf6eca52dabeb014c122fdabd7bf0';
    
    $data = array(
        'query' => '7707083893',
        'branch_type' => 'MAIN'
    );
    
    curl_setopt($crl, CURLOPT_URL, $url); 
    curl_setopt($crl, CURLOPT_HTTPHEADER, $headr);
    curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($crl, CURLOPT_POST, true);
    curl_setopt($crl, CURLOPT_POSTFIELDS, '{ "query": "' . $inn . '" }');
    $rest = curl_exec($crl);
    
    curl_close($crl);
    
    print_r($rest);

    