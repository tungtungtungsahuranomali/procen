<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];

$getidhotel = $_GET['idhotel'];

$takedatahotel = "SELECT * FROM about WHERE id_about = '$getidhotel'";
$connettakedatahotel = mysqli_query($koneksi, $takedatahotel);
while($takedata = mysqli_fetch_array($connettakedatahotel)){
  $judulabout = $takedata['judul_about'];
  $deskripsiabout = $takedata['deskripsi_about'];
  $gambarabout = $takedata['gambar_about'];
  $namahotel = $takedata['nama_hotel'];
}


if(isset($_POST['submit'])){
  $judulhotel = $_POST['judulhotel'];
  $deskripsihotel = $_POST['deskripsihotel'];
  $gambarhotel = $_FILES['gambarhotel']['name'];
  $targetpath = "images/picabout/";
  $path = $targetpath.basename($gambarhotel);
  $tmpgambar = $_FILES['gambarhotel']['tmp_name'];

  

  if(!empty(trim($judulhotel))){
    if(!empty(trim($deskripsihotel))){
      if(move_uploaded_file($tmpgambar, $path)){
        $insertdata = "UPDATE about set judul_about = '$judulhotel', deskripsi_about = '$deskripsihotel', gambar_about = 'http://192.168.30.4/controlpanel/images/picabout/$gambarhotel' WHERE id_about = '$getidhotel'";
        $connect = mysqli_query($koneksi, $insertdata);
        if($connect){
          header("location:about.php");
        }else{
          echo "gagal update";
        }
      }else{
        echo "kesalahan pada gambar";
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
  	<title>IPTV CMS</title>
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
        <h1><a href="index.php" class="logo"></a></h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="Room-list.php"><span class="fa fa-home"></span> Room</a>
          </li>

          <li>
            <a href="index.php"><span class="fa fa-list"></span> Channel</a>
          </li>

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

          <li>
            <a href="User-list.php"><span class="fa fa-user"></span> User</a>
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

        <h2 class="mb-4"><?php echo $namahotel; ?><Title></Title></h2>

         <form method="GET" enctype="multipart/form-data">
          <div class="mb-3 w-75">
            <label for="exampleFormControlInput2" class="form-label">Judul</label>
            <input type="text" class="form-control" name="judulhotel" id="exampleFormControlInput2" value="<?php echo $judulabout; ?>">
          </div>

          <div class="mb-3 w-75" style="display: flex; align-items: center;">
            <label for="exampleFormControlInput3" class="form-label" style="margin-right: 10px;">Deskripsi</label>
            <textarea name="deskripsihotel" style="width: 450px; height: 200px;"><?php echo $deskripsiabout; ?></textarea>
          </div>

          <div style="display: flex; flex-direction: column;">
            <input type="file" name="gambarhotel">
          </div>

          <script type="text/javascript">
            function back(){
              window.location.href = "about.php";
            }
          </script>

          <br>
          <div style="display: flex; flex-direction: row;">
          <input class="btn" type="submit" name="submit" value="Submit" style="margin-right: 10px; font-weight: bolder; background-color: blue; color: white;">
          </form>
          <button type="button" class="btn" onclick="back()" style="background-color: red; color: white; font-weight: bolder;">Cancel</button>

       
    </div>







  <?php
  }else{
  header("location:login.php");
  }
   ?>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
  </body>
</html>