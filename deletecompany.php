<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");
    
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $id       = $decodedData['id'];

    $IQ = "DELETE FROM `companies` WHERE `companies`.`id` = '$id'";

    $R = mysqli_query($CN, $IQ);

    if($R) {
        $message = "Company has been deleted.";
    } else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>