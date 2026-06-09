<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];

//take data tv
$datatv = "SELECT * FROM tv";
$connectdatatv = mysqli_query($koneksi, $datatv);


if(isset($_POST['submit'])){
  $macaddress = $_POST['macaddress'];
  $roomname = $_POST['roomname'];

  // insert device
  $adddevice = "INSERT INTO tv set mac_address = '$macaddress', room_name = '$roomname'";
  $connectadddevice = mysqli_query($koneksi, $adddevice);
  if($connectadddevice){
    header("location:Television-list.php");
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
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
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

        <h2 class="mb-4">Add device<Title></Title></h2>

         <form method="POST">
          <div class="mb-3 w-75">
            <label for="exampleFormControlInput2" class="form-label">MAC address</label>
            <input type="text" class="form-control" name="macaddress" id="exampleFormControlInput2" placeholder="Masukkan MAC address">
          </div>

          <div class="mb-3 w-75">
            <label for="exampleFormControlInput3" class="form-label">Room name</label>
            <input type="text" class="form-control" name="roomname" id="exampleFormControlInput3" placeholder="Masukkan Room name">
          </div>

          <script type="text/javascript">
            function back(){
              window.location.href = "Television-list.php";
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