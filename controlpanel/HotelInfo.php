
<?php
 $id_hotel = $_POST['id_hotel'];
 $posisi = $_POST['posisi'];
 
include('my_con.php');
//echo "TES<br/>";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "SELECT title_gambar, url_gambar,deskripsi_hotel FROM tb_hotelinfo  WHERE id_hotel = :id_hotel ORDER BY urut ASC LIMIT $posisi , 1";
	$sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$sth->execute(array(':id_hotel' => $id_hotel));
	//$conn->exec($sql);
	$result = $sth->fetchAll();
	$arr= $result[0];
	//var_dump($arr);
	//$conn->close();
//$arr = array ('deviceID' => "insert success", 'esn' => $devid);
	//$arr = array('status' => "Data Saved");
    //echo "Insert Success";
    }
catch(PDOException $e)
    {
	$arr = array('status' => "Connection failed: " . $e->getMessage());
	//arr = array ('deviceID' => "Connection failed: " . $e->getMessage(), 'esn' => $devid);
    //echo "Connection failed: " . $e->getMessage();
   }

echo str_replace('\\/', '/', json_encode($arr));
?>
