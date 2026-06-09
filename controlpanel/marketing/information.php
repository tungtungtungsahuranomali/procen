<?php 

include 'koneksi.php';
session_start();
$usersession = $_SESSION['username'];
$sessionlevel = $_SESSION['level'];

 ?>
<!doctype html>
<html lang="en">
  <head>
    <title>HR-IPTV-CP</title>
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
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
          </li>
          <li>
            <a href="reflexology.php"><span class="fa fa-image"></span> Reflexology</a>
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

      <!-- Open Running Text -->
       <h3>Running Text</h3>

       <?php

       $takedatatext = "SELECT r_text FROM tb_hotel WHERE id_hotel = '7'";
       $connectdatatext = mysqli_query($koneksi, $takedatatext);
       if(mysqli_num_rows($connectdatatext) > 0){
        while($datatext = mysqli_fetch_array($connectdatatext)){
          $hotelid = $datatext['id_hotel'];
          $textcontent = $datatext['r_text'];
      ?>
       <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Content</div>
          <div><p><?php echo  $textcontent; ?></p></div>
        </div>
        <?php
          }
          ?>
          <script type="text/javascript">
            function editruntext(){
              window.location.href = "editruntext.php?idhotel=7";
            }
          </script>
          <div style="margin-top: 50px;">
          <button type="button" onclick="editruntext()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit Content Running Text</button>
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
        <!--Close Running Text --> 
        <hr style="height: 3px; background-color: black;">

        <!-- open emergency -->
        <h3>Emergency procedures</h3>

        <?php 

        $takedataemergency = "SELECT * FROM information WHERE kategori = 'emergency'";
        $connecttakedataemergency = mysqli_query($koneksi, $takedataemergency);
        if(mysqli_num_rows($connecttakedataemergency) > 0){
          while($dataemergency = mysqli_fetch_array($connecttakedataemergency)){
            $idemergency = $dataemergency['id_information'];
            $judulemergency = $dataemergency['judul'];
            $deskripsiemergency = $dataemergency['deskripsi'];
            //$gambaremergency = $dataemergency['gambar_about'];
            $kategoriemergency = $dataemergency['kategori'];
            ?>

        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Judul</div>
          <div><?php echo  $judulemergency; ?></div>
        </div>


        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder;color: black;">Deskripsi</div>
          <div><?php echo  $deskripsiemergency; ?></div>
        </div>

        <?php
          }
          ?>
          <script type="text/javascript">
            function emergencymove(){
              window.location.href = "editemergency.php?idemergency=<?php echo $idemergency; ?>";
            }
          </script>

          <div style="margin-top: 50px;">
          <button type="button" onclick="emergencymove()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit laman information Emergency procedures</button>
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
         <!-- close emergency -->

<hr style="height: 3px; background-color: black;">

















<!-- open csr -->
<h3>CSR</h3>
 <?php 
        $takedatacsr = "SELECT * FROM information WHERE kategori = 'csr'";
        $connecttakedatacsr = mysqli_query($koneksi, $takedatacsr);
        if(mysqli_num_rows($connecttakedatacsr) > 0){
          while($datacsr = mysqli_fetch_array($connecttakedatacsr)){
            $idcsr = $datacsr['id_information'];
            $judulcsr = $datacsr['judul'];
            $deskripsicsr = $datacsr['deskripsi'];
            //$gambarcsr = $dataaboutharris['gambar_about'];
            $kategoricsr = $datacsr['kategori'];
            ?>

        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Judul</div>
          <div><?php echo  $judulcsr; ?></div>
        </div>

        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Deskripsi</div>
          <div><?php echo  $deskripsicsr; ?></div>
        </div>

        <?php
          }
          ?>
           <script type="text/javascript">
            function csrmove(){
              window.location.href = "editcsr.php?idcsr=<?php echo $idcsr;  ?>";
            }
          </script>

          <div style="margin-top: 50px;">
          <button type="button" onclick="csrmove()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit laman information CSR</button>
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
         <!-- close csr -->












<hr style="height: 3px; background-color: black;">

















<!-- open travel destination -->
<h3>Travel Destination</h3>
 <?php 
        $takedatadestination = "SELECT * FROM information WHERE kategori = 'destination'";
        $connecttakedatadestination = mysqli_query($koneksi, $takedatadestination);
        if(mysqli_num_rows($connecttakedatadestination) > 0){
          while($datadestination = mysqli_fetch_array($connecttakedatadestination)){
            $iddestination = $datadestination['id_information'];
            $juduldestination = $datadestination['judul'];
            $deskripsidestination = $datadestination['deskripsi'];
            //$gambardestination = $dataaboutharris['gambar_about'];
            $kategoridestinatin = $datadestination['kategori'];
            ?>

        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Judul</div>
          <div><?php echo  $juduldestination; ?></div>
        </div>

        <div style="display: flex; flex-direction: column;">
          <div style="font-weight: bolder; color: black;">Deskripsi</div>
          <div><?php echo  $deskripsidestination; ?></div>
        </div>

        <?php
          }
          ?>
           <script type="text/javascript">
            function destinationmove(){
              window.location.href = "editdestination.php?iddestination=<?php echo $iddestination;  ?>";
            }
          </script>

          <div style="margin-top: 50px;">
          <button type="button" onclick="destinationmove()" style="margin-top: 30px; border-radius: 5px; padding: 10px; background-color: green; color: white; border: none; outline: none; font-weight: bolder;">Edit laman Travel Destination</button>
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
         <!-- close travel destination -->












    </div>
  








  <?php 
    }else{
      header("location:login.php");
    }
     ?>



      <script type="text/javascript">
      window.addEventListener("load", function() {
      var bannerNode = document.querySelector('[alt="172.31.15.253"]').parentNode.parentNode;
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
  <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
</html>