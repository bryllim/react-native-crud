<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");
    
    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $firstname      = $decodedData['firstname'];
    $lastname       = $decodedData['lastname'];
    $company        = $decodedData['company'];
    $email          = $decodedData['email'];

    $IQ = "INSERT INTO `employees` (firstname, lastname, company, email) VALUES ('$firstname','$lastname','$company', '$email')";

    $R = mysqli_query($CN, $IQ);

    if($R) {
        $message = "Successfully added employee!";
    } else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>