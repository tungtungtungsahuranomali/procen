<?php 

include 'koneksi.php';

session_start();

$roomget = $_GET['deviceid'];
$deleteroom = "DELETE FROM tb_room WHERE device_id = '$roomget'";
$connectdeleteroom = mysqli_query($koneksi, $deleteroom);
if($connectdeleteroom){
	header("location:Room-list.php");
}
 ?>