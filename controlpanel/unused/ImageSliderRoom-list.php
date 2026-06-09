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
          <li>
            <a href="Background-setup.html"><span class="fa fa-image"></span>Background</a>
          </li>
          <li>
            <a href="Television-list.html"><span class="fa fa-tv"></span>Television</a>
          </li>
          <li>
            <a href="WelcomeScreen-setup.html"><span class="fa fa-image"></span> Welcome Screen</a>
          </li>
          <li>
            <a href="SingleList-list.html"><span class="fa fa-image"></span> Single List</a>
          </li>
          <li>
            <a href="DoubleList-list.html"><span class="fa fa-image"></span> Double List</a>
          </li>
          <li>
            <a href="ImageSliderRoom-list.html"><span class="fa fa-image"></span> Image Slider</a>
          </li>
          <li>
            <a href="User-list.html"><span class="fa fa-user"></span> User</a>
          </li>
          <li>
            <a href="EventLog.html"><span class="fa fa-book"></span> Log</a>
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
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#">Menu 1</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#">Menu 2</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" style="color: black;" href="#">Menu 3</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h2 class="mb-4">Image Slider Room List<Title></Title></h2>
        <a class="btn btn-primary" href="#" role="button">Add Room</a>
        <div class="table-responsive w-75">
          <table class="table table-striped custom-table">
            <thead>
              <tr>
                <th scope="col">
                  <label class="control control--checkbox">
                    <input type="checkbox" class="js-check-all"/>
                    <div class="control__indicator"></div>
                  </label>
                </th>
                <th scope="col">No</th>
                <th scope="col">Room Name</th>
                <th scope="col">Option</th>
              </tr>
            </thead>
            <tbody>
              <tr scope="row">
                <td>
                  <label class="control control--checkbox">
                  <input type="checkbox" />
                  <div class="control__indicator"></div>
                  </label>
                </td>
                <td>
                  1
                </td>
                <td class="pl-0">
                  <div class="d-flex align-items-center">
                    <a href="#" class="mac_address"> Meeting Room 1</a>
                  </div>
                </td>
                <td>
                  <a class="edit btn btn-outline-success" href="#">Image List</a>
                  <a class="edit btn btn-outline-primary" href="#">Edit Room</a>
                  <a class="edit btn btn-outline-danger" href="#">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
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
</html>