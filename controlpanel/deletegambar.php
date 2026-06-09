<?php
include 'koneksi.php';
session_start();

$idpromotionget = $_GET['idpromotion'];

// Fetch the image filename from the database
$query = "SELECT link_gambar FROM promotion WHERE id = '$idpromotionget'";
$result = mysqli_query($koneksi, $query);
$row = mysqli_fetch_assoc($result);
$fileurl = $row['link_gambar'];

if (isset($_POST['confirm_delete'])) {
    // Delete the image from the database
    $takedatapromotion = "DELETE FROM promotion WHERE id = '$idpromotionget'";
    $connecttakedatapromotion = mysqli_query($koneksi, $takedatapromotion);
    if ($connecttakedatapromotion) {
        // Delete the image file from the server
        $imagePath = $fileurl;
        if (file_exists($imagePath)) {
            unlink($imagePath);
        }
        header("location:promotion.php");
    }
}

// Construct the image URL based on the filename
$gambarURL = $fileurl;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Delete Image</title>
    <script type="text/javascript">
        // Function to show confirmation dialog
        function confirmDelete() {
            return confirm("Are you sure you want to delete this image?");
        }
    </script>
</head>
<body>
    <h1>Delete Image</h1>
    <img src="<?php echo $gambarURL; ?>" alt="Image Preview" width="500px">

    <form method="POST" onsubmit="return confirmDelete()">
        <p>Click the "Delete" button to delete the image.</p>
        <button type="submit" name="confirm_delete">Delete</button>
    </form>
</body>
</html>
