<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];

$roomget = $_GET['deviceid'];

//Ambil Data Room
$dataroom = "SELECT * FROM tb_room WHERE device_id = '$roomget'";
$connectdataroom = mysqli_query($koneksi, $dataroom);
while($takedataroom = mysqli_fetch_array($connectdataroom)){
  $roomnamedb = $takedataroom['room_name'];
  $deviceiddb = $takedataroom['device_id'];
  $guestnamedb = $takedataroom['guest_name'];
  $genderdb = $takedataroom['gender'];
}

// update data room
if(isset($_POST['submit'])){
  $guestname = $_POST['guestname'];
  $gender = $_POST['gender'];

  $updateroom = "UPDATE tb_room set guest_name ='$guestname', gender = '$gender' where device_id = '$roomget'";
  $connectupdateroom = mysqli_query($koneksi, $updateroom);

  if($connectupdateroom){
    header("location:Room-list.php");
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

        <h2 class="mb-4">Room Edit<Title></Title></h2>

        <div> 
        Current Room Name : <span style="color: red; font-weight: bolder;"><?php echo $roomnamedb; ?></span>
        </div>

        <div> 
        Current Device ID : <span style="color: red; font-weight: bolder;"><?php echo $deviceiddb; ?></span>
        </div>

        <form method="POST">
        <div class="mb-3 w-75">
          <label for="exampleFormControlInput1" class="form-label">Guest name</label>
          <input type="text" class="form-control" name="guestname" id="exampleFormControlInput1" value="<?php echo $guestnamedb; ?>">
        </div>

        <div style="display: flex; flex-direction: column;">
            <div class="mb-3 w-75">
                <label for="exampleFormControlInput1" class="form-label">Gender</label>
                <select name="gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </div>
          </div>

        <script type="text/javascript">
          function back(){
            window.location.href = "Room-list.php";
          }
        </script>

        <br>
        <div style="display: flex; flex-direction: row;">
        <input class="btn" type="submit" name="submit" value="Submit" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">
        </form>
        <button type="button" class="btn" onclick="back()" style="font-weight: bolder; background-color: red; color: white;">Cancel</button>
        </div>



      </div>
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