<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");
    
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $id             = $decodedData['id'];
    $firstname      = $decodedData['firstname'];
    $lastname       = $decodedData['lastname'];
    $company        = $decodedData['company'];
    $email          = $decodedData['email'];

    $IQ = "UPDATE `employees` SET `firstname` = '$firstname', `lastname` = '$lastname', `company` = '$company', `email` = '$email' WHERE `employees`.`id` = '$id'";

    $R = mysqli_query($CN, $IQ);

    if($R) {
        $message = "Employee information has been updated.";
    } else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>