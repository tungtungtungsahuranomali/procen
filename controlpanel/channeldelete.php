<?php 

include 'koneksi.php';
session_start();

$idget = $_GET['idchannelget'];

$deletechannel = "DELETE FROM channelnew WHERE id = '$idget'";
$connectdeletechannel = mysqli_query($koneksi, $deletechannel);

if($connectdeletechannel){
	header("location:index.php");
}else{
	?>	
	<script type="text/javascript">
		alert("gagal delete");
	</script>
	<?php 
}




 ?>