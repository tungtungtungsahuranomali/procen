<?php 

include 'koneksi.php';

session_start();

//$gambar_about = 'https://dbharris.000webhostapp.com/images/picabout/$gambartauzia'

$usersession = $_SESSION['username'];

$getidemergency = $_GET['idemergency'];

$takedataemergency = "SELECT * FROM information WHERE id_information = '$getidemergency'";
$connettakedataemergency = mysqli_query($koneksi, $takedataemergency);
while($takedata = mysqli_fetch_array($connettakedataemergency)){
  $judulemergency = $takedata['judul'];
  $deskripsiemergency = $takedata['deskripsi'];
  //$gambaremergency = $takedata['gambar'];
  $kategoriemergency = $takedata['kategori'];
}

if(isset($_POST['submit'])){
  $judulemergency1 = $_POST['judulemergency'];
  $deskripsiemergency1 = $_POST['deskripsiemergency'];
  //$gambaremergency = $_FILES['gambartauzia']['name'];
  //$targetpath = "images/picabout/";
  //$path = $targetpath.basename($gambartauzia);
  //$tmpgambar = $_FILES['gambartauzia']['tmp_name'];

  

  if(!empty(trim($judulemergency1))){
    if(!empty(trim($deskripsiemergency1))){

        if($connettakedataemergency){
          $insertdata = "UPDATE information set judul = '$judulemergency1', deskripsi = '$deskripsiemergency1' WHERE id_information = '$getidemergency'";
          $connect = mysqli_query($koneksi, $insertdata);
          header("location:information.php");
        }else{
          echo "gagal update";
        }
    
    }else{
      echo "deskripsi tidak boleh kosong";
    }
  }else{
    echo "judul tidak boleh kosong";
  }


}



 ?>
<!doctype html>
<html lang="en">
  <head>
  	<title>HR-IPTV-CP</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="fonts/icomoon/style.css">
    <link rel="stylesheet" href="css/style_table.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
  </head>

  <body>

  <?php 

  if($usersession){
    ?>

    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar" class="active">
        <h1><a href="index.php" class="logo">HR.</a></h1>
        <ul class="list-unstyled components mb-5">
          <li>
            <a href="service.php"><span class="fa fa-list"></span> Service</a>
          </li>

          <li>
              <a href="facilities.php"><span class="fa fa-list"></span> fasilitas</a>
          </li>

          <li>
              <a href="information.php"><span class="fa fa-list"></span> Information</a>
          </li>
      
          <li>
            <a href="WelcomeScreen-setup.php"><span class="fa fa-tv"></span>Welcome Screen</a>
          </li>
       
          <li>
            <a href="SingleList-list.php"><span class="fa fa-image"></span> Promotion</a>
          </li>

          <li>
            <a href="DoubleList-list.php"><span class="fa fa-image"></span> Reflexology</a>
          </li>

          <li>
            <a href="about.php"><span class="fa fa-image"></span> About</a>
          </li>
        </ul>
      </nav>

      <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-primary">
              <i class="fa fa-bars"></i>
              <span class="sr-only">Toggle Menu</span>
            </button>
            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="nav navbar-nav ml-auto">
                <li><span style="color: black; font-weight: bolder; margin-right: 10px;">Hi, <?php echo $usersession; ?></span></li>
                <li>
                  <script type="text/javascript">
                    function logout(){
                      window.location.href = "logout.php";
                    }
                  </script>
                  <button onclick="logout()" style="background-color: red; color: white; font-weight: bolder; outline: none;border: none; border-radius: 5px;">Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h2 class="mb-4"><?php echo $judulemergency; ?><Title></Title></h2>

         <form method="POST" enctype="multipart/form-data">
          <div class="mb-3 w-75">
            <label for="exampleFormControlInput2" class="form-label">Judul</label>
            <input type="text" class="form-control" name="judulemergency" id="exampleFormControlInput2" value ="<?php echo $judulemergency; ?>">
          </div>

          <div class="mb-3 w-75" style="display: flex; align-items: center;">
            <label for="exampleFormControlInput3" class="form-label" style="margin-right: 10px;">Deskripsi</label>
            <textarea name="deskripsiemergency" style="width: 450px; height: 200px;"><?php echo $deskripsiemergency; ?></textarea>
          </div>

          <!--
          <div style="display: flex; flex-direction: column;">
            <input type="file" name="gambartauzia">
            <div>Current gambar : <span style="color: red; font-weight:bolder;"><?php echo $gambarabout; ?></span></div>
          </div>
        -->

          <script type="text/javascript">
            function back(){
              window.location.href = "information.php";
            }
          </script>

          <br>
          <div style="display: flex; flex-direction: row;">
          <input class="btn" type="submit" name="submit" value="Submit" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">
          </form>
          <button type="button" class="btn" onclick="back()" style="background-color: red; color: white; font-weight: bolder;">Cancel</button>

       
    </div>







  <?php
  }else{
  header("location:login.php");
  }
   ?>


 <script type="text/javascript">
      window.addEventListener("load", function() {
      var bannerNode = document.querySelector('[alt="www.000webhost.com"]').parentNode.parentNode;
      bannerNode.parentNode.removeChild(bannerNode);
});

    </script>



    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
  </body>
</html>