<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];

if(isset($_POST['submit'])){
  $name = $_POST['namachannel'];
  $ip = $_POST['ipaddress'];
  $prioritas = $_POST['prioritas'];
  $port = $_POST['port'];
  $judulgambar = $_FILES['gambar']['name'];
  $tmpgambar = $_FILES['gambar']['tmp_name'];
  $targetpath = "./images/channellogo/";
  $path = $targetpath.basename($judulgambar);


$insertdatachannel = "INSERT INTO channelnew set ip = '@$ip', ip2 = 'udp://$ip', channel_title = '$name', ip4 = '$ip', prioritas = '$prioritas', port = '$port', img = '$judulgambar', is_online = 'offline'";

$connectinsertdatachannel = mysqli_query($koneksi, $insertdatachannel);

if(!empty($name)){
  if(!empty($ip)){
    if(!empty($prioritas)){
       if(!empty($port)){
          if(move_uploaded_file($tmpgambar, $path)){
            if($connectinsertdatachannel == true){
              header("location:index.php");
            }else{
              ?>
              <script type="text/javascript">
                alert("gagal tambah channel");
              </script>
              <?php  
            }
          }else{
            ?>
            <script type="text/javascript">
              alert("gambar gagal terupload");
            </script>
            <?php
          }
       }else{
        ?>
        <script type="text/javascript">
          alert("Port tidak boleh kosong");
        </script>
        <?php  
       }
    }else{
      ?>
      <script type="text/javascript">
        alert("Prioritas tidak boleh kosong");
      </script>
    <?php 
    }
  }else{
    ?>
    <script type="text/javascript">
      alert("ip address tidak boleh kosong");
    </script>
    <?php 
  }
}else{
  ?>
  <script type="text/javascript">
    alert("nama channel tidak boleh kosong");
  </script>
  <?php 
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

        <h2 class="mb-4">Add Channel<Title></Title></h2>

        <form method="POST" enctype="multipart/form-data">

        <div class="mb-3 w-75">
          <label for="exampleFormControlInput4" class="form-label">Nama Channel</label>
          <input type="text" class="form-control" name="namachannel" id="exampleFormControlInput4" placeholder="Nama Channel">
        </div>

        <!--
        <div class="mb-3 w-75">
          <label for="channel_category" class="form-label">Kategori</label>
          <select class="form-select" id="channel_category" name="kategori" aria-label="Default select example">
              <option value="Entertainment">Entertainment</option>
              <option value="News">News</option>
              <option value="Kids">Kids</option>
              <option value="Sports">Sports</option>
              <option value="Documentation">Documentation</option>
          </select>
        </div>
      -->

        <div class="mb-3 w-75">
          <label for="exampleFormControlInput1" class="form-label">IP Address</label>
          <input type="text" class="form-control" name="ipaddress" id="ipaddress" placeholder="Format : xxx.xxx.xxx.xxx">
        </div>


        <div class="mb-3 w-75">
          <label for="exampleFormControlInput2" class="form-label">Prioritas</label>
          <input type="text" class="form-control" id="exampleFormControlInput2" name="prioritas" placeholder="Masukkan priority">
        </div>
        

        <div class="mb-3 w-75">
          <label for="exampleFormControlInput3" class="form-label">Port</label>
          <input type="text" class="form-control" id="exampleFormControlInput3" name="port" placeholder="Default : 5000">
        </div>


        <div class="mb-3 w-75">
          <label for="exampleFormControlInput5" class="form-label">Gambar</label>
          <input type="file" class="form-control" id="exampleFormControlInput5" name="gambar">
        </div>


        

        <script type="text/javascript">
          function back(){
            window.location.href = "index.php";
          }
        </script>

        <br>
        <div style="display: flex; flex-direction: row;">
        <input class="btn btn-primary" type="submit" name="submit" value="Submit" style="margin-right: 10px;">
        </form>
        <button type="button" class="btn btn-danger" onclick="back()">Cancel</button>
        </div>
      </div>
		</div>

    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
  </body>
  <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
</html>