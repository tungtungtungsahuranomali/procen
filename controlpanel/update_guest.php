<?php
include('my_con.php');

$devid = $_GET['devid'];
$room_name = $_GET['room_name'];
$guest_name = $_GET['guest_name'];
//echo $guest_name."<br/>".$room_name;

try {
	/*$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "UPDATE tb_room SET guest_name=? WHERE room_name=?"; // WHERE id_channel = :devid";
	$q = $conn->prepare($sql);
	$q->execute(array($guest_name,$room_name));*/
	$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
	$conn->exec("SET CHARACTER SET utf8");      // Sets encoding UTF-8
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	 //$sql = "UPDATE `tb_room` SET  guest_name=:guest_name WHERE room_name=:room_name";
	 
	$sql = "INSERT INTO tb_room (room_name, device_id, guest_name) VALUES (:room_name, :devid, :guest_name) ON DUPLICATE KEY UPDATE room_name=VALUES(room_name), guest_name=VALUES(guest_name)";
	


	 $statement = $conn->prepare($sql);
	 $statement->bindValue(":room_name", $room_name);
	 $statement->bindValue(":devid", $devid);
	 $statement->bindValue(":guest_name", $guest_name);
	 $count = $statement->execute();

  $conn = null;        // Disconnect
	echo "sukses$count";
	}
catch(PDOException $e)
	{
	$arr = array('status' => "Connection failed: " . $e->getMessage());
	echo $e->getMessage();
   }
 ?>
