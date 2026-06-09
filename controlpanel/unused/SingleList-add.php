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
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar" class="active">
				<h1><a href="index.html" class="logo">HR.</a></h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="Room-list.html"><span class="fa fa-home"></span> Room</a>
          </li>
          <li>
            <a href="Channel-list.html"><span class="fa fa-list"></span> Channel</a>
          </li>
          <!--
          <li>
            <a href="Background-setup.php"><span class="fa fa-image"></span>Background</a>
          </li>
        -->
          <li>
            <a href="Television-list.html"><span class="fa fa-tv"></span>Television</a>
          </li>
          <!--
          <li>
              <a href="WelcomeScreen-setup.php"><span class="fa fa-image"></span> Welcome Screen</a>
          </li>
        -->
          <li>
            <a href="SingleList-list.html"><span class="fa fa-image"></span> Promotion</a>
          </li>
          <li>
            <a href="DoubleList-list.html"><span class="fa fa-image"></span> Reflexology</a>
          </li>
          <li>
            <a href="ImageSliderRoom-list.html"><span class="fa fa-image"></span> Image Slider</a>
          </li>
          <li>
            <a href="User-list.html"><span class="fa fa-user"></span> User</a>
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

        <h2 class="mb-4">Add Pic promotion<Title></Title></h2>
        <div class="mb-3 w-75">
          <label for="exampleFormControlInput1" class="form-label">Menu Title</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Menu Title">
        </div>
        <br>
        <div>
          <h5>TINYMCE TEXT EDITOR</h5>
        </div>
        <br>
        <div class="mb-3 w-75">
          <label for="formFile" class="form-label">Choose Image</label>
          <input class="form-control" type="file" id="formFile">
          <br>
          <button type="button" class="btn btn-outline-success">Preview</button>
        </div>
        <br>
        <input class="btn btn-primary" type="submit" value="Submit">
        <button type="button" class="btn btn-danger" href="#">Cancel</button>
      </div>
		</div>
    
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/popper.min.js"></script>
  </body>
</html>