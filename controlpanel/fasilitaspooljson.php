<?php 

$koneksi = mysqli_connect("localhost", "oakwood", "#Oakwood123", "web_tv");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$data = array();

$datafasilitas = mysqli_query($koneksi, "SELECT * FROM fasilitas WHERE kategori = 'swimmingpool'");
while($takedata = mysqli_fetch_assoc($datafasilitas)){
	$data[] = $takedata;
}

echo json_encode($data);


 ?>