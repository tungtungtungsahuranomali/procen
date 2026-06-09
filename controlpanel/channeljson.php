<?php 

$koneksi = mysqli_connect("localhost", "oakwood", "#Oakwood123", "web_tv");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

$data = array();

$take = mysqli_query($koneksi,"SELECT `id`, `ip4`, `ip`, `ip2`, `port`, `channel_title` AS name, `prioritas`, `img` FROM channelnew where is_online = 'online' ORDER BY prioritas ASC");
while($ambildata = mysqli_fetch_assoc($take)){
	$data[] = $ambildata;
}

echo json_encode($data);
 ?>