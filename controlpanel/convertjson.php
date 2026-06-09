<?php




// Membaca file JSON
$json = file_get_contents('channel.json');

// Mengonversi data JSON ke array
$data = json_decode($json, true);


// Koneksi ke database MySQL
$conn = new mysqli('localhost', 'root', '', 'web_tv');

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}


// Perulangan untuk menyisipkan setiap baris data ke dalam tabel
foreach ($data as $row) {
    $sql = "INSERT INTO channelnew (id, ip4, ip, ip2, ip3, port, name, prioritas, img) VALUES ('" . $row['id'] . "', '" . $row['ip4'] . "', '" . $row['ip'] . "', '" . $row['ip2'] . "', '" . $row['ip3'] . "', '" . $row['port'] . "', '" . $row['name'] . "', '" . $row['prioritas'] . "', '" . $row['img'] . "')";

    if ($conn->query($sql) === TRUE) {
        echo "Data berhasil disimpan";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
