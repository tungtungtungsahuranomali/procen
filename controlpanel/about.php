<?php 

include 'koneksi.php';

session_start();
$usersession = $_SESSION['username'];
$sessionlevel = $_SESSION['level'];


 ?>
<!doctype html>
<html lang="en">
  <head>
  	<title>IPTV CMS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?faamily=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
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
      if($sessionlevel == 'marketing'){
        header("Location: ./marketing/service.php");
        exit();
      }
      ?>
        <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar" class="active">
        <h1><a href="index.php" class="logo"></a></h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="Room-list.php"><span class="fa fa-home"></span> Room</a>
          </li>
          <li>
            <a href="index.php"><span class="fa fa-list"></span>Channel</a>
          </li>
          <li>
            <a href="service.php"><span class="fa fa-list"></span>Service</a>
          </li>
          <li>
              <a href="facilities.php"><span class="fa fa-list"></span>fasilitas</a>
          </li>
          <li>
              <a href="information.php"><span class="fa fa-list"></span>Information</a>
          </li>
          <li>
            <a href="WelcomeScreen-setup.php"><span class="fa fa-tv"></span>Welcome Screen</a>
          </li>
          <li>
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
          </li>
          <li>
            <a href="reflexology.php"><span class="fa fa-image"></span> Ascott Cares</a>
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


        
        <!-- open Ascott-->

        <h3>About 1</h3>

        <?php 

        $takedatagroup = "SELECT * FROM about WHERE id_about = '1'";
        $connecttakedataaboutgroup = mysqli_query($koneksi, $takedatagroup);
        if(mysqli_num_rows($connecttakedataaboutgroup) > 0){
          while($dataaboutgroup = mysqli_fetch_array($connecttakedataaboutgroup)){
            $idgroup = $dataaboutgroup['id_about'];
            $judulaboutgroup = $dataaboutgroup['judul_about'];
            $deskripsiaboutgroup = $dataaboutgroup['deskripsi_about'];
            $gambarabboutgroup = $dataaboutgroup['gambar_about'];
            $namahotelgroup = $dataaboutgroup['nama_hotel'];
            ?>


        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Judul</div>
          <div><?php echo  $judulaboutgroup; ?></div>
        </div>


        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder;color: black;">Deskripsi</div>
          <div><?php echo  $deskripsiaboutgroup; ?></div>
        </div>




       <?php
          }
          ?>
          <script type="text/javascript">
            function groupmove(){
              window.location.href = "editabout1.php?idhotel=<?php echo $idgroup; ?>";
            }
          </script>

          <div style="margin-top: 50px;">
          <button type="button" onclick="groupmove()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit laman Ascott</button>
          </div>

      <?php 
        }else{
        ?>

        <div style="display: flex; justify-content: center; margin-top: 50px;">
        <h1 style="color: red; font-weight: bolder;">TIDAK ADA DATA</h1>
        </div>
        <?php 
        }



         ?>

         <!-- close group hotel -->







<hr style="height: 3px; background-color: black;">






<h3>About 2</h3>



<!-- open hotel hotel -->

 <?php 

        $takedataabout = "SELECT * FROM about WHERE id_about = '2'";
        $connecttakedataabout = mysqli_query($koneksi, $takedataabout);
        if(mysqli_num_rows($connecttakedataabout) > 0){
          while($dataabouthotel = mysqli_fetch_array($connecttakedataabout)){
            $idhotel = $dataabouthotel['id_about'];
            $judulhotel = $dataabouthotel['judul_about'];
            $deskripsiabouthotel = $dataabouthotel['deskripsi_about'];
            $gambarabbouthotel = $dataabouthotel['gambar_about'];
            $namahotelhotel = $dataabouthotel['nama_hotel'];
            ?>


        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Judul</div>
          <div><?php echo  $judulhotel; ?></div>
        </div>


        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Deskripsi</div>
          <div><?php echo  $deskripsiabouthotel; ?></div>
        </div>






        <?php
          }
          ?>
           <script type="text/javascript">
            function hotelmove(){
              window.location.href = "editabout1.php?idhotel=<?php echo $idhotel;  ?>";
            }
          </script>

          <div style="margin-top: 50px;">
          <button type="button" onclick="hotelmove()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit laman Oakwood Hotel</button>
          </div>
          <?php 
        }else{
        ?>

        <div style="display: flex; justify-content: center; margin-top: 50px;">
        <h1 style="color: red; font-weight: bolder;">TIDAK ADA DATA</h1>
        </div>
        <?php 
        }



         ?>


         <!-- close hotel hotel -->



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
  <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
</html>
