<?php 

include 'koneksi.php';


session_start();

$usersession = $_SESSION['username'];

$idreflexologyget = $_GET['idreflexologi'];

$datareflexology = "SELECT * FROM reflexology WHERE id_reflexology = '$idreflexologyget'";
$connectdatareflexology = mysqli_query($koneksi, $datareflexology);

if(mysqli_num_rows($connectdatareflexology) > 0){
  while($takedatareflexology = mysqli_fetch_array($connectdatareflexology)){
    $idreflexology = $takedatareflexology['id_reflexology'];
    $kategori = $takedatareflexology['kategori'];
    $gambar = $takedatareflexology['gambar'];
    $judul = $takedatareflexology['judul'];
    $deskripsi = $takedatareflexology['deskripsi'];
    $harga = $takedatareflexology['harga'];
  }
}


if(isset($_POST['submit'])){
  $judulupdate = $_POST['judul'];
  $deskripsiupdate = $_POST['deskripsi'];
 // $hargaupdate = $_POST['harga'];
  $kategoriupdate = $_POST['kategori'];

  $updatedatareflexology = "UPDATE reflexology set kategori = '$kategoriupdate', judul = '$judulupdate', deskripsi = '$deskripsiupdate', harga = '' WHERE id_reflexology = '$idreflexologyget'";

  $connectupdatedatareflexology = mysqli_query($koneksi, $updatedatareflexology);

  if($connectupdatedatareflexology){
    header("location:DoubleList-list.php");
  }else{
    ?>
    <script type="text/javascript">
      alert("data gagal di update");
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
            <a href="WelcomeScreen-setup.php"><span class="fa fa-tv"></span>Welcome Screen</a>
          </li>
          <li>
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
          </li>

          <li>
            <a href="DoubleList-list.php"><span class="fa fa-image"></span> Reflexology</a>
          </li>

          <li>
            <a href="ImageSliderRoom-list.php"><span class="fa fa-image"></span> Image Slider</a>
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

        <h2 class="mb-4">Change Reflexology<Title></Title></h2>
    

        <form method="POST" enctype="multipart/form-data">

          <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
              <label for="exampleFormControlInput1" class="form-label">Judul</label>
              <input type="text" class="form-control" name="judul" id="exampleFormControlInput1" value="<?php echo $judul; ?>">
            </div>

            <div style="margin-bottom: 50px;">
              Current judul : <span style="color: red; font-weight: bolder;"><?php echo  $judul; ?></span>
            </div>
          </div>

        <div class="mb-3 w-75">
          <div style="display: flex; flex-direction: column;">

          <div style="display: flex; flex-direction: column;"> 
            <div>
            <label for="exampleFormControlInput2" class="form-label">Deskripsi</label>
            </div>
            <div>
            <textarea name="deskripsi" style="width: 600px; height: 200px; outline: none;"><?php echo $deskripsi; ?></textarea>
          </div>

            <div style="margin-bottom: 50px;">
              Current deskripsi : <span style="color: red; font-weight: bolder;"><?php echo  $deskripsi; ?></span>
            </div>

          </div>
        </div>


        <!--
        <div style="display: flex; flex-direction: column;">
        <div class="mb-3 w-75">
          <label for="exampleFormControlInput3" class="form-label">Harga</label>
          <input type="text" class="form-control" name="harga" id="exampleFormControlInput3" value="<?php echo $harga; ?>">
        </div>

      
          <div style="margin-bottom: 50px;">
              Current harga : <span style="color: red; font-weight: bolder;"><?php echo  $harga; ?></span>
            </div>
          </div>
        -->


        <!--
        <div class="mb-3 w-75">
          <label for="exampleFormControlInput4" class="form-label">Center picture</label>
          <input type="file" class="form-control" name="centerpic" id="exampleFormControlInput4">
        </div>
        -->

        <div class="mb-3 w-75">
          <label for="exampleFormControlInput4" class="form-label">Kategori</label>
          <div style="display: flex; flex-direction: column;">
          <div>
          <select name="kategori">
            <!--<option value="Body_Rituals">BODY RITUALS</option>
            <option value="Lawana_Simplicity">LAWANA SIMPLICITY</option> -->
            <option value="body_enchants">BODY ENCHANTS</option>
            <option value="signate">THE SIGNATURE BODY EXPERIENCE</option>
           <!-- <option value="Add_to_Your_Treatment_Experience">ADD TO YOUR BODY TREATMENT EXPERIENCE</option> -->
          </select>
          </div>

          <div>
            Current category : <span style="color: red; font-weight: bolder;"><?php echo  $kategori; ?></span>
          </div>
          </div>
        </div>


        <script type="text/javascript">
          function back(){
            window.location.href = "DoubleList-list.php";
          }
        </script>

        <br>

        <div style="display: flex; flex-direction: row;">
          <input class="btn" type="submit" name="submit" value="Submit" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">
          </form>
          <button type="button" class="btn" onclick="back()" style="background-color: red; color: white; font-weight: bolder;">Cancel</button>
        </div>


       
        </div>
      </div>
    </div>


<?php 
  }else{
header("location:DoubleList-list.php");
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