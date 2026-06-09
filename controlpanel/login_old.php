<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" type="image/x-icon" href="/img/logovebtoo.png">

    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    <title>Login</title>
  </head>
  <body>


    <!-- open komponen register 1 -->

       <h2 style="text-align: center; font-weight: bolder;margin-top: 50px; margin-bottom: 50px;">LOGIN</h2>

       <div style="display: flex; justify-content: center; padding: 10px; margin: 10px;">
         
        <form method="POST" action="loginengine.php">

          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" name="username" placeholder="masukkan username" autofocus>
          </div>

         

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" placeholder="masukkan password" name="password">
          </div>

         
          <button type="submit" class="btn btn-primary" name="submit">Login</button>
        </form>

        </div>


       <!-- close komponen register 1 -->   
    




   
    <script src="bootstrap/js/bootstrap.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>

   
  </body>
  <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>
</html>