<?php 

$koneksi = mysqli_connect("localhost", "root", "c1pt4", "web_tv");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$data = array();

$runningtext = mysqli_query($koneksi, "SELECT * FROM running_text");
while($takedata = mysqli_fetch_assoc($runningtext)){
	$data[] = $takedata;
}

echo json_encode($data);


 ?>