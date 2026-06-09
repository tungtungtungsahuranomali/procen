<?php
// File: RoomInfo.php

// Include file my_con.php for database connection
include('my_con.php');

// Retrieve the POST data from JavaScript
$devid = $_POST['devid'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Retrieve room information from tb_room based on device ID
    $sql = "SELECT guest_name, room_name FROM tb_room WHERE device_id = :devid";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':devid', $devid);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    // Prepare the response data
    $response = [
        'guest_name0' => $result['guest_name'],
        'guest_name1' => $result['guest_name'],
        'room_name0' => $result['room_name'],
        'room_name1' => $result['room_name']
    ];

    // Return the response data as JSON
    echo json_encode($response);
} catch (PDOException $e) {
    // Handle any database errors
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
?>
