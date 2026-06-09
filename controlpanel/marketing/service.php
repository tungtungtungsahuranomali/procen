<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];

$dataservice = "SELECT * FROM service";
$connectdataservice = mysqli_query($koneksi, $dataservice);

if(isset($_POST['submit'])){
  $gambar = $_FILES['gambar']['name'];
  $storage = $_FILES['gambar']['tmp_name'];

  $insert = "INSERT INTO service set judul_gambar = '$gambar', link_gambar = 'http://172.31.15.253/controlpanel/images/picservices/$gambar'";
  $connectinsert = mysqli_query($koneksi, $insert);
  if(!empty($gambar)){
    if(move_uploaded_file($storage, "../images/picservices/".$gambar)){
      header("location:service.php");
    }
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
              <a href="facilities.php"><span class="fa fa-list"></span> Fasilitas</a>
            </li>
            <li>
              <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
            </li>
            <li>
              <a href="reflexology.php"><span class="fa fa-image"></span> Reflexology</a>
            </li>
            <li>
              <a href="information.php"><span class="fa fa-list"></span> Information</a>
          </li>
          <li>
            <a href="WelcomeScreen-setup.php"><span class="fa fa-tv"></span>Welcome Screen</a>
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

          <h2 class="mb-4">Service<Title></Title></h2>
          <p>Insert pic</p>

          <form method="POST" enctype="multipart/form-data">
            <div style="display: flex; flex-direction: column;">
              <input type="file" name="gambar">
              <input class="btn" style="width: 150px; margin-top: 10px; background-color: blue; color: white; font-weight: bolder;" name="submit" type="submit" value="add pic">
            </div>
          </form>

          <div class="table-responsive w-75">
            <table class="table table-striped custom-table">

              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>

                <?php 

                if(mysqli_num_rows($connectdataservice)){
                  while($takedataservices = mysqli_fetch_array($connectdataservice)){
                    $idservice = $takedataservices['id_service'];
                    $judulgambar = $takedataservices['judul_gambar'];
                    $linkgambar = $takedataservices['link_gambar'];
                    ?>

                    <tr scope="row">
                      <td><?php echo $idservice; ?></td>
                      <td class="pl-0"><?php echo $judulgambar; ?></td>
                      <td>
                        <a class="edit btn" href="deleteservice.php?idservice=<?php echo $idservice; ?>" style="background-color: red; color: white; font-weight: bolder;">Delete</a>
                        <a class= "btn btn-success" target="_blank" href="<?php echo $linkgambar; ?>">Preview</a>
                      </td>
                    </tr>

                <?php 
                  }
                }
                 ?>
                
           

              </tbody>

            </table>
          </div>
        </div>
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