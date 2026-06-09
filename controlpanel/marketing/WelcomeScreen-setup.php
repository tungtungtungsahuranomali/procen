<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];
$sessionlevel = $_SESSION['level'];

$databg = "SELECT * FROM welcome_background";
$connectdatabg = mysqli_query($koneksi, $databg);



// update gambar welcome
if(isset($_POST['submit'])){
  $storage = $_FILES['gambar']['tmp_name'];
  $nama_file = 'welcome.png'; 
  $update = "UPDATE welcome_background set link_background = 'http://172.31.15.253/controlpanel/images/welcome.png' WHERE id = '0'";
  $connectupdate = mysqli_query($koneksi, $update);
  if(!empty($_FILES['gambar']['name'])){
    if(move_uploaded_file($storage, "./images/".$nama_file)){
      header("location:WelcomeScreen-setup.php");
    }
  }else{
    ?>
    <script type="text/javascript">
      setTimeout(function(){
        alert("kolom gambar tidak boleh kosong");
      },2000);
    </script>
    <?php 
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

  <?php 
  if($usersession){
    ?>

  <body>
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar" class="active">
				<h1><a href="index.html" class="logo">HR.</a></h1>
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
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
          </li>
          <li>
            <a href="reflexology.php"><span class="fa fa-image"></span> Reflexology</a>
          </li>
          <li>
            <a href="about.php"><span class="fa fa-image"></span> About</a>
          </li>
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
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#"></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#"></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#"></a>
                </li>
              </ul>
            </div>

          </div>
        </nav>
        <!-- Form Upload-->
       <form method="POST" enctype="multipart/form-data">
        <h2 class="mb-4">Setup Welcome Screen</h2>
        <div class="mb-3 w-75">
          <label for="formFile" class="form-label">Choose Image</label>
          <input class="form-control" type="file" id="formFile" name="gambar">
        </div>
        <div class="mb-3">
          <button type="submit" name="submit" class="btn btn-primary">Submit</button>
          <a class="btn btn-success" href="http://172.31.15.253/controlpanel/previews/welcomepreview.php" target="_blank">Preview</a>
        </div>
      </form>
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