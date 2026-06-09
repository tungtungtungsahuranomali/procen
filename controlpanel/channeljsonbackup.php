<?php
header("Access-Control-Allow-Origin: *");
$devid =   @$_POST['deviceID']; //$_GET['deviceID'];//'P7CEDSU5OS7Y6';//$_POST['deviceID'];
include ('my_con.php');
$cat = @$_GET["cat"];
//echo "TES<br/>";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO tb_test (devid) VALUES(:devid)";
        $sth = $conn->prepare($sql);
        $sth->execute(array(':devid' => $devid));
	
	
	if (empty($cat)){
	
		
		$sql = "SELECT * FROM (". 
			"(SELECT tb_channel.id_channel AS id, ipaddress AS ip4, concat('@',ipaddress) AS ip, link_video as ip2, http_url as ip3, port, title_channel AS name, prioritas, img_src AS img	 FROM tb_channel WHERE non_aktif = 'N'   ORDER BY prioritas DESC, ipaddress ASC) ".
			") a ORDER BY  prioritas ASC, ip ASC";
			
		$sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$sth->execute(array(":devid" => $devid));
	}else{
		
		$sql = "SELECT * FROM (". 
			"(SELECT tb_channel.id_channel AS id, ipaddress AS ip4, concat('@',ipaddress) AS ip, link_video as ip2, http_url as ip3, port, title_channel AS name, prioritas, img_src AS img	 FROM tb_channel WHERE non_aktif = 'N' AND kategori = :kategori ORDER BY prioritas DESC, ipaddress ASC) ".
			") a ORDER BY  prioritas ASC, ip ASC";
		$sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$sth->execute(array(":kategori"=> $cat ));
	}
	
	//$conn->exec($sql);
	//$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);
	$arr= $result;
	//$arr[0]['name'] = $devid;
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
//foreach ($arr as $value ){
//	echo $value['id']. ";". $value['ip2'].";".$value['name'].";<br/>\n";
//}
echo json_encode($arr);
?>
