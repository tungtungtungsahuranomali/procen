<?php 

include 'koneksi.php';


$datachannel = "SELECT * FROM channel";
$connectdatachannel = mysqli_query($koneksi, $datachannel);

$data = array();

//fetch hasil

while($row = mysqli_fetch_assoc($connectdatachannel)){
	$data[] = $row;
}

$json = json_encode($data);

echo $json;




 ?>