<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Welcome Word from Pacific Hotel</title>
	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>
<body>
<?php
include ("my_con.php");
$devid = $_GET['devid'];
$arr =  array();
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT room_name, gambar, nama_hotel, guest_name, device_id, id_language, gender, birthday ";
    $sql = $sql."FROM tb_room ";
    $sql = $sql."LEFT OUTER JOIN tb_hotel ";
    $sql = $sql."ON tb_room.id_hotel = tb_hotel.id_hotel ";
    $sql = $sql."WHERE device_id = :devid";
    $sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
    $sth->execute(array(':devid' => ''.$devid.''));
    //$conn->exec($sql);
    $result = $sth->fetch(PDO::FETCH_ASSOC);
    $arr = $result;
}catch(PDOException $e){
    $arr = array('status' => "Connection failed: " . $e->getMessage());
    echo "<div>Error Generating Page, ".$arr['status']."</div>";
    die();
}
if (empty($arr)){
    echo "<div>Device Not Found</div>";
    die();
}

?>
	<div></div>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<div class="container">
	  <h1 class="text-center">Pacific Palace Hotel Welcome Letter</h1>
	  <div class="row">
		<div class="col-md-8">
			<p> <?php echo date("d-m-Y");?> </p>
			<p> <?php echo $arr['guest_name'];?> </p>
			<p> Room : <?php echo $arr['room_name']?> </p>
			<p> Dear <?php echo (($arr['gender']==='male')?"Mr. ":"Mrs. ").$arr['guest_name']?> </p>
			<br/>
			<p> Welcome to Pacific Palace Hotel </p>
			<p> Thank you for choosing Pacific Palace Hotel which offers a blend of Eastern and Western hospitality in an atmosphere of timeless elegance, beyound comfortable and stylish rooms, unmatched Sea view. </p>
			<p> It's the people of Pacific Palace Hotel who will make your experience truly exceptional. </p>
			<p> Our all rooms are equipped with conveniences like air-conditioning, satellite TV, DVD, mini-bar, IDD telephone, a writing desk, and high speed internet access </p>
			<p> Additionally each room has a smoke detectors and sprinklers. </p>
			<p> The large bathrooms feature a separate toilet, a shower and a bath. </p>
			<p> Our Hotel has Four non-smoking floors and Baby cots are also available with a surcharge. </p>
			<p> Should you require any additional help or information during your stay with us, pelase do not hesitate to contact our Duty Managers at their desk in the lobby or dial extension XXX from your room. </p>
			<p> Wish you a pleasent staying, thank you. </p>
			<p> Best regards, </p>
			<p> Hotel Management </p>
		</div>
		<div class="col-md-4">
			<div class="row">
				 <img src="images/3.jpg" class="img-responsive img-thumbnail" alt="3.jpg"> 
				 <pre class="col-md-12">
 Pacific Palace Hotel
 Jl. Duyung Sei Jodoh, Nagoya,
 Batam Island, Indonesia 29432
 Phone       : +62 778 421111
 Fax         : +62 778 459799
 Website     : www.pacificpalacehotel.com
 Reservation : reserve@pacificpalacehotel.com
				 </pre>
			</div>
		</div>
	  </div>
	</div>
</body>
</html>
