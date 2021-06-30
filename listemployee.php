<?php

    $CN = mysqli_connect("localhost","root","");
    $DB = mysqli_select_db($CN, "reactdemo");

    $IQ = "SELECT e.id, firstname, lastname, email, c.name company FROM employees e INNER JOIN companies c ON c.id = e.company";
    
    $R = mysqli_query($CN, $IQ);

    $employees = array();
    
    while ($db_field = mysqli_fetch_assoc($R)) {
        $employees[] = $db_field;
    }

    echo json_encode($employees);

?>