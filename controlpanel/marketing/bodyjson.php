<?php 

$koneksi = mysqli_connect("localhost", "root", "c1pt4", "web_tv");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$data = array();

$take = mysqli_query($koneksi,"SELECT * FROM reflexology WHERE kategori = 'body_enchants'");
while($ambildata = mysqli_fetch_assoc($take)){
	$data[] = $ambildata;
}

echo json_encode($data);
 ?>