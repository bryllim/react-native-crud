<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");
    
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $name     = $decodedData['name'];
    $address  = $decodedData['address'];
    $website  = $decodedData['website'];

    $IQ = "INSERT INTO `companies` (name, address, website) VALUES ('$name','$address','$website')";

    $R = mysqli_query($CN, $IQ);

    if($R) {
        $message = "Successfully added company!";
    } else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>