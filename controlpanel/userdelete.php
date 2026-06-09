<?php 

include 'koneksi.php';

session_start();

$idadminget = $_GET['iduser'];
$deleteuser = "DELETE FROM user WHERE id_admin = '$idadminget'";
$connectdeleteuser = mysqli_query($koneksi, $deleteuser);
if($connectdeleteuser){
	header("location:User-list.php");
}




 ?>