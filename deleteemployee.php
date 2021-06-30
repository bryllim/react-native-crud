<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");
    
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $id       = $decodedData['id'];

    $IQ = "DELETE FROM `employees` WHERE `employees`.`id` = '$id'";

    $R = mysqli_query($CN, $IQ);

    if($R) {
        $message = "Employee has been deleted.";
    } else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>