<?php

include 'koneksi.php';
session_start();

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = sha1($_POST['password']);

    $takedataadmin = "SELECT * FROM user WHERE username = '$username'";
    $connecttakedataadmin = mysqli_query($koneksi, $takedataadmin);

    if (mysqli_num_rows($connecttakedataadmin) > 0) {
        while ($takedata = mysqli_fetch_array($connecttakedataadmin)) {
            $usernamedb = $takedata['username'];
            $passworddb = $takedata['password'];
            $leveldb = $takedata['level'];
        }

        if (!empty(trim($username)) && !empty(trim($password))) {
            if ($username == $usernamedb) {
                if ($password == $passworddb) {
                    if ($leveldb == 'super') {
                        $_SESSION['username'] = $usernamedb;
                        $_SESSION['level'] = $leveldb;
                        header("location:index.php");
                    } else {
                        $_SESSION['username'] = $usernamedb;
                        $_SESSION['level'] = $leveldb;
                        header("location:./marketing/service.php");
                    }
                } else {
                    ?>
                    <script type="text/javascript">
                        alert("password salah");
                    </script>
                    <?php
                }
            } else {
                ?>
                <script type="text/javascript">
                    alert("username salah");
                </script>
                <?php
            }
        } else {
            ?>
            <script type="text/javascript">
                alert("username atau password tidak boleh kosong");
            </script>
            <?php
        }
    } else {
        ?>
        <script type="text/javascript">
            alert("user tidak ditemukan");
        </script>
        <?php
    }
}
?>
