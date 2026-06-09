<?php 

include 'koneksi.php';
session_start();

$sessionname = $_SESSION['username'];

$getidchannel = $_GET['idchannelget'];

// ambil data channel dari get 
$takedatachannel = "SELECT * FROM channelnew WHERE id = '$getidchannel'";
$connectdatachannel = mysqli_query($koneksi, $takedatachannel);
while($takedatachannel = mysqli_fetch_array($connectdatachannel)){
  $namachanneldb = $takedatachannel['channel_title'];
  $ipchanneldb = $takedatachannel['ip4'];
  $prioritasdb = $takedatachannel['prioritas'];
  $portdb = $takedatachannel['port'];
  $statusdb = $takedatachannel['is_online'];
}



// update data channel
if(isset($_POST['submit'])){
  $namachannel = $_POST['namachannel'];
  $ipaddress = $_POST['ipaddress'];
  $prioritas = $_POST['prioritas'];
  $port = $_POST['port'];
  $status = $_POST['status'];

  $updatechannel = "UPDATE channelnew set channel_title ='$namachannel', ip4 ='$ipaddress', prioritas ='$prioritas', port = '$port', is_online = '$status' WHERE id ='$getidchannel'";
  $connectupdatechannel = mysqli_query($koneksi, $updatechannel);

  if($connectupdatechannel){
    header("location:index.php");
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

if($sessionname){
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
            <a href="promotion.php"><span class="fa fa-image"></span> Promotion</a>
          </li>

          <li>
            <a href="reflexology.php"><span class="fa fa-image"></span> Reflexology</a>
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
                <li><span style="color: black; font-weight: bolder; margin-right: 10px;">Hi, <?php echo $sessionname; ?></span></li>
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

        <?php 
         ?>


        <h2 class="mb-4">EDIT CHANNEL<Title></Title></h2>



        <!-- open change status -->
        <form method="POST">
            
            
            
        <!-- open nama channel -->
        <div style="display: flex; flex-direction: column;">
          <div class="mb-3 w-75">
            <label for="exampleFormControlInput1" class="form-label">Nama Channel</label>
            <input type="text" class="form-control" name="namachannel" id="exampleFormControlInput1" value ="<?php echo $namachanneldb; ?>">
          </div>
          <div>
            <p>Current Channel Title : <span style="font-weight: bolder; color: red;"><?php echo $namachanneldb ; ?></span></p>
          </div>
        </div>
        <!-- close nama channel -->
        
        
        

<!--
        <div style="display: flex; flex-direction: column;">


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


        <div>
          <p>Current category : <span style="font-weight: bolder; color: red;"><?php echo $kategoridb ; ?></span></p>
        </div>

        </div>
-->

        <!-- open ip address -->
          <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
                <label for="exampleFormControlInput1" class="form-label">IP Address</label>
                <input type="text" class="form-control" name="ipaddress" id="exampleFormControlInput1" value ="<?php echo $ipchanneldb; ?>">
            </div>
            <div>
              <p>Current IP address : <span style="color: red; font-weight: bolder;"><?php echo $ipchanneldb ; ?></span></p>
            </div>
          </div>
        <!-- close ip address -->
          
          
          
          <!-- open prioritas -->
           <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
                <label for="exampleFormControlInput1" class="form-label">Prioritas</label>
                <input type="text" class="form-control" name="prioritas" id="exampleFormControlInput1" value ="<?php echo $prioritasdb; ?>">
            </div>
            <div>
              <p>Current Priority : <span style="color: red; font-weight: bolder;"><?php echo $prioritasdb ; ?></span></p>
            </div>
          </div>
          <!-- close prioritas -->
          
          
           
          <!-- open port -->
           <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
                <label for="exampleFormControlInput1" class="form-label">Port</label>
                <input type="text" class="form-control" name="port" id="exampleFormControlInput1" value ="<?php echo $portdb; ?>">
            </div>
            <div>
              <p>Current Port : <span style="color: red; font-weight: bolder;"><?php echo $portdb ; ?></span></p>
            </div>
          </div>
          <!-- close port -->



      
          <!-- open status -->
           <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
                <label for="exampleFormControlInput1" class="form-label">Status channel</label>
                <select name="status">
                  <option value="online" <?php if($statusdb == 'online') {echo 'selected';} ?>>Online</option>
                  <option value="offline"<?php if($statusdb == 'offline') {echo 'selected';} ?>>Offline</option>
                </select>
            </div>
            <div>
              <p>
              Current Status : <span style="font-weight: bolder; color: red;">
         
              <?php 

                if($statusdb == "online"){
                  ?>
                  <span style="color: green;">Online</span>
                  <?php  
                }else{
                  ?>
                  <span style="color: red;">Offline</span>
                  <?php
                  
                }

               ?>
               </span> 
              </p>
            </div>
          </div>
          <!-- close status -->

      

        <script type="text/javascript">
          function back(){
            window.location.href = "index.php";
          }
        </script>

        <br>
        <div style="display: flex; flex-direction: row;">
        <input class="btn" type="submit" name="submit" value="Submit" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">
        </form>
        <button type="button" class="btn" onclick="back()" style="background-color: red; color: white; font-weight: bolder;">Cancel</button>
        </div>
      </div>

      <!-- close change status -->



<?php
}else{
?>
    
    <script type="text/javascript">
      window.location.href = "login.php";
    </script>

<?php
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