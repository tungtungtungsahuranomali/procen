<?php 

include 'koneksi.php';

session_start();

$usersession = $_SESSION['username'];
$sessionlevel = $_SESSION['level'];

$dataroom = "SELECT * FROM tb_room ORDER BY `tb_room`.`room_name` ASC";
$connectdataroom = mysqli_query($koneksi, $dataroom);



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
            <a href="index.php"><span class="fa fa-list"></span> Channel</a>
          </li>

          <li>
              <a href="service.php"><span class="fa fa-list"></span>Ascott Star Rewards</a>
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

        <h2 class="mb-4">Room List<Title></Title></h2>
        <a class="btn" href="addroom.php" role="button" style="background-color: blue; color: white; font-weight: bolder;">Add Room / Device</a>
        <div class="table-responsive">

          <table class="table table-striped custom-table">

            <thead>
              <tr>
                <th scope="col">Room No</th>
                <th scope="col">Device ID</th>
                <th scope="col">Guest Name</th>
                <th scope="col">Gender</th>
              </tr>
            </thead>

            <tbody>

              <?php 

              if(mysqli_num_rows($connectdataroom)){
                while($takedataroom = mysqli_fetch_array($connectdataroom)){
                  $deviceid = $takedataroom['device_id'];
                  $roomname = $takedataroom['room_name'];
                  $guestname = $takedataroom['guest_name'];
                  $gender = $takedataroom['gender'];
                  ?>


                  <tr scope="row">

                  <td><?php echo $roomname; ?></td>
      
                  <td><?php echo $deviceid; ?></td>

                  <td class="pl-0">
                    <div class="d-flex align-items-center">
                      <a class="name"><?php echo $guestname; ?></a>
                    </div>
                  </td>

                  <td><?php echo $gender; ?></td>

                  <td>
                    <div style="display: flex; flex-direction: row;">
                      <div>
                        <a class="edit btn" href="editroom.php?deviceid=<?php echo $deviceid; ?>" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">Edit</a>
                      </div>

                      <div>
                        <a class="edit btn btn-danger" href="deleteroom.php?deviceid=<?php echo $deviceid; ?>" style="background-color: red; font-weight: bolder;">Delete</a>
                      </div>
                    </div>
                  </td>


                  <td>
                    <div style="display: flex; flex-direction: column;">
                      <div>
                   <!--     <a class="edit btn" href="statusoccupied.php?deviceid=<?php echo $deviceid; ?>" style="margin-right: 10px; background-color: blue; color: white; font-weight: bolder;">Change</a> -->
                      </div>

                      <div>
                      </div>
                    </div>
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

		
		
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
  </body>
</html>
