<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");

    $encodedData = file_get_contents('php://input');
    $decodedData = json_decode($encodedData,true);

    $username  = $decodedData['username'];
    $password  = $decodedData['password'];

    $IQ = "SELECT id FROM users WHERE username = '$username' AND password = '$password'";

    $R = mysqli_query($CN, $IQ);

    if(mysqli_num_rows($R) == 1){
        // session_register("username");
        // $_SESSION['login_user'] = $username;
        $message = "You have logged in.";
        $success = 1;
    }else{
        $message = "Invalid credentials.";
        $success = 0;
    }

    $response[] = array(
        "Message" => $message,
        "success" => $success,
    );

    echo json_encode($response);

?>