<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");

    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $username  = $decodedData['username'];
    $password  = $decodedData['password'];

    $IQ = "INSERT INTO users(`username`,`password`) values('$username','$password')";

    $R = mysqli_query($CN, $IQ);

    if($R)
    {
        $message = "You have successfully registered your account.";
    }else{
        $message = "Server error. Please try later.";
    }

    $response[] = array(
        "Message" => $message
    );

    echo json_encode($response);

?>