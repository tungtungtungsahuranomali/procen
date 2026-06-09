<?php 

$koneksi = mysqli_connect("localhost", "root", "c1pt4", "web_tv");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$jsonarray = array();

$data = mysqli_query($koneksi, "SELECT * FROM about WHERE id_about = '1'");
while($ambildata = mysqli_fetch_assoc($data)){
	$jsonarray[] = $ambildata;
}

echo json_encode($jsonarray);





 ?>