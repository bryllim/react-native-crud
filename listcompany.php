<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");

    $IQ = "SELECT * FROM `companies` WHERE 1";

    $R = mysqli_query($CN, $IQ);

    $companies = array();
    
    while ($db_field = mysqli_fetch_assoc($R)) {
        $companies[] = $db_field;
    }
    
    echo json_encode($companies);

?>