<?php

include('headers.php');
include('../db/airports-class.php');

$db = new SQLite3('../db/store.db');
$airports = new Airports($db);

// TODO Check 
// $_SERVER['REQUEST_METHOD']

echo "GET Airports - ";

switch($_SERVER['REQUEST_METHOD']){

    case "GET":
        $all_airports = $airports->read();
        print_r($all_airports);

        http_response_code(200);
        echo json_encode(['message' => 'all good']);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"));
        $airports->create($data);
        break;

    case "PUT":
        echo "method PUT";
        break;

    case "DELETE":
        $airports->delete();
        echo "method DELETE";
        break;
    
    default:

        break;
}