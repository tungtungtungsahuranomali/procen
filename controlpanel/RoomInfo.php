<?php

header("Access-Control-Allow-Origin: *");
//echo "A";
function inRoom($id_language,$room){
	$room_name = "";
	switch($id_language){
		case 1: 
			$room_name = "Room ".$room;
			break;
		case 2: 
			$room_name = "Kamar ".$room;
			break;
		case 3: 
			$room_name = "".$room." 室";
			break;
		case 4: 
			$room_name = "ルーム".$room."";
			break;
		case 5: 
			$room_name = "룸 (".$room.")";
			break;
	}
	return $room;
}

 $devid = $_POST['devid'];//'P7CEDSU5OS7Y6';//  '9147d555b053ca1f';//
//$devid = 'tes';
 $welcometo0 = "Selamat Datang";
 $welcometo1 = "Welcome";
 // $welcomeword0 = "Kenyamanan Anda adalah Kesenangan Kami";
 // $welcomeword1 = "Your Leisure is Our Pleasure";
 $right1 = array(
	1 => "TO OPEN",
	2 => "U/ MEMBUKA",
	3 => "打开",
	4 => "スマートテレビ",
	5 => "스마트 TV"
);
 $right2 = array(
	1 => "SMART TV",
	2 => "SMART TV",
	3 => "SMART TV",
	4 => "を開きます",
	5 => "를 엽니 다"
 );
 $welcometo = array(
	1 => "Welcome",
	2 => "Selamat Datang",
	3 => "欢迎",
	4 => "ようこそ",
	5 => "환영"
 );
 $welcomeword = array(
	1 => "We trust your stay with us<br/> will be enjoyable and comfortable",
	2 => "Kami percaya Anda akan merasa <br/>senang dan nyaman tinggal bersama kami",
	3 => "我们信我们的服务<br/>带给您舒适的住宿",
	4 => "<span style='letter-spacing: 1px;'>私たちはあなたの快適な滞在を持って</span><br/>サービスを信じています",
	5 => "우리는 당신에게 편안한 숙박을<br/>가지고 서비스 믿는다."
 );
 
 $happybirthday = array(
	1 => "Happy Birhtday",
	2 => "Selamat Ulang Tahun",
	3 => "生日快乐",
	4 => "ハッピー·バースデー",
	5 => "생일"
 );
 $ucapanbirthday = array(
	1 => "We wish you days filled with warm sunshine,<br/>thousands of happy smiles and laughter, and the priceless loves",
	2 => " Semoga panjang umur,<br/> selalu sehat dan bahagia!",
	3 => "祝你生日欢快、永远幸福快乐。",
	4 => "誕生日おめでとうございます",
	5 => "오래 행복하게, 건강하게 사시고요"
 );
 $welcomeword0 = "Kami percaya Anda akan merasa <br/>senang dan nyaman tinggal bersama kami";
 $welcomeword1 = "We trust your stay with us<br/> will be both enjoyable and comfortable";
 $left10 = "left10";
 $left11 = "left11";
 $left20 = "left20";
 $left21 = "left21";
 $right10 = "right10";
 $right11 = "right11";
 $right20 = "right20";
 $right21 = "right21";
include('my_con.php');
//echo "TES<br/>";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO tb_test2 (devid) VALUES(:devid)";
        $sth = $conn->prepare($sql);
        $sth->execute(array(':devid' => $devid));



	$sql = "SELECT room_name, gambar, nama_hotel, guest_name, device_id, id_language, gender, birthday, r_text ";
	$sql = $sql."FROM tb_room ";
	$sql = $sql."LEFT OUTER JOIN tb_hotel ";
	$sql = $sql."ON tb_room.id_hotel = tb_hotel.id_hotel ";
	$sql = $sql."WHERE device_id = :devid";
	$sth = $conn->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$sth->execute(array(':devid' => ''.$devid.''));
	//$conn->exec($sql);
	$result = $sth->fetch(PDO::FETCH_ASSOC);
	$id_language = $result['id_language'];
	if ($id_language === '4'){
			$arr['guest_name0'] = "".$result['guest_name']." - san";
			$arr['guest_name1'] = "".$result['guest_name']." - san";
	}elseif($id_language === '3'){
		if ($result['gender'] === 'male'){
			$arr['guest_name0'] = "".$result['guest_name']." 先生";
			$arr['guest_name1'] ="".$result['guest_name']." 先生";
		}elseif($result['gender'] === 'female'){
			$arr['guest_name0'] = "".$result['guest_name']."女士";
			$arr['guest_name1'] = "".$result['guest_name']."女士";
		}else{
                        $arr['guest_name0'] = "".$result['guest_name'];
                        $arr['guest_name1'] = "".$result['guest_name'];
		}
	}elseif($id_language === '5'){
		if ($result['gender'] === 'male'){
			$arr['guest_name0'] = "".$result['guest_name']." 씨";
			$arr['guest_name1'] ="".$result['guest_name']." 씨";
		}elseif($result['gender'] === 'female'){
			$arr['guest_name0'] = "".$result['guest_name']."부인";
			$arr['guest_name1'] = "".$result['guest_name']."부인";
                }else{
                        $arr['guest_name0'] = "".$result['guest_name'];
                        $arr['guest_name1'] = "".$result['guest_name'];
                }

	}elseif($id_language === '2'){
		if ($result['gender'] === 'male'){
			$arr['guest_name0'] = "Tn. ".$result['guest_name']."";
			$arr['guest_name1'] ="Tn. ".$result['guest_name']."";
		}elseif($result['gender'] === 'female'){
			$arr['guest_name0'] = "Ny. ".$result['guest_name']."";
			$arr['guest_name1'] = "Ny. ".$result['guest_name']."";
                }else{
                        $arr['guest_name0'] = "".$result['guest_name'];
                        $arr['guest_name1'] = "".$result['guest_name'];
                }
	}else{
		if ($result['gender'] === 'male'){
			$arr['guest_name0'] = "Mr. ".$result['guest_name'];
			$arr['guest_name1'] = "Mr. ".$result['guest_name'];
		}elseif($result['gender'] === 'female'){
			$arr['guest_name0'] = "Mrs. ".$result['guest_name'];
			$arr['guest_name1'] = "Mrs. ".$result['guest_name'];
                }else{
                        $arr['guest_name0'] = "".$result['guest_name'];
                        $arr['guest_name1'] = "".$result['guest_name'];
                }
	}
	if (date('m-d', strtotime($result['birthday'])) == date('m-d')){
		$arr['welcometo0'] = $happybirthday[$id_language];
		$arr['welcometo1'] =  $happybirthday[$id_language];
		$arr['nama_hotel0'] =  $result['nama_hotel'];
		$arr['nama_hotel1'] = $result['nama_hotel'];
		$arr['room_name0'] = inRoom($id_language,$result['room_name']);
		$arr['room_name1'] = inRoom($id_language,$result['room_name']);

		$arr['welcomeword0']= "<span style='letter-spacing: 1px;font-size:18pt;'>$ucapanbirthday[$id_language]</span>";//$right1[$result['id_language']];
		$arr['welcomeword1']= "<span style='letter-spacing: 1px;font-size:18pt;'>$ucapanbirthday[$id_language]</span>";//$right1[$result['id_language']];
	}else{
		//$arr= $result[0];
		//$birthday = $result['birthday'];
		$arr['welcometo0'] = $welcometo0;
		$arr['welcometo1'] = $welcometo1;
		//$arr['welcometo0'] = $welcometo[$id_language];
		//$arr['welcometo1'] = $welcometo[$id_language];
		$arr['nama_hotel0'] =  $result['nama_hotel'];
		$arr['nama_hotel1'] = $result['nama_hotel'];
		$arr['room_name0'] = $result['room_name'];// "di Kamar ".
		$arr['room_name1'] = $result['room_name'];// "at Room ".
		//$arr['room_name0'] = inRoom($id_language,$result['room_name']);
		//$arr['room_name1'] = inRoom($id_language,$result['room_name']);
		//$arr['welcomeword0'] = $welcomeword[$result['id_language']];
		//$arr['welcomeword1'] = $welcomeword[$result['id_language']];
		$arr['r_text0'] = $result['r_text'];//Running Text
		$arr['welcomeword0'] = $welcomeword0;
		$arr['welcomeword1'] = $welcomeword1;
	}
	$g = trim($result['guest_name']);
	if(empty($g)){
        	$arr['guest_name0'] = "";
        	$arr['guest_name1'] = "";
	}
	$r = trim($result['room_name']);
	if(empty($r)){
	
                $arr['room_name0'] = "0";// "di Kamar ".
                $arr['room_name1'] = "0";// "at Room ".

	}
	$arr['left10'] = $devid;
	$arr['left10'] = "ANNOUNCEMENT";
	$arr['left11'] = $left11;
	$arr['left11'] = "ANNOUNCEMENT";

/*	$arr['left20'] = $left20;
	$arr['left20'] = "<p>Dear ".$result['guest_name'].",</p>
			  <p>A warm welcome to Nagoya Hill Hotel Batam!</p>
			  <p>Kindly be informed that we will be performing check and repair works on the hotel telephone on Wednesday morning, 4 November from 00.00 am to 04.00 am.</p>
			  <p>Therefore, the telephones will be unavailable for use during this period of time</p>
			  <p>We sincerely apologise for any incovenience caused.</p>
			  <p>The management</p>
"; 

	$arr['left21'] = $left21;
        $arr['left21'] = "<p>Dear ".$result['guest_name'].",</p>
                          <p>A warm welcome to Nagoya Hill Hotel Batam!</p>
                          <p>Kindly be informed that we will be performing check and repair works on the hotel telephone on Wednesday morning, 4 November from 00.00 am$
                          <p>Therefore, the telephones will be unavailable for use during this period of time</p>
                          <p>We sincerely apologise for any incovenience caused.</p>
                          <p>The management</p>
"; */

	$arr['right10'] = $right1[$result['id_language']];
	$arr['right11'] = $right1[$result['id_language']];
	$arr['right20'] = $right2[$result['id_language']];
	$arr['right21'] = $right2[$result['id_language']];
		

//                $arr['welcomeword0'] = "Update Your Smart TV by Execute this link on browser\n http://iptv.cic.net.id/update_guest.php?\ndevid=[DeviceID_onSamsungTV]&\nroom_name=[RoomName]&\nguest_name=[YourName]\n";
//                $arr['welcomeword1'] = "Update Your Smart TV by Execute this link on browser\n http://iptv.cic.net.id/update_guest.php?\ndevid=[DeviceID_onSamsungTV]&\nroom_name=[RoomName]&\nguest_name=[YourName]\n";

	//$conn->close();
//$arr = array ('deviceID' => "insert success", 'esn' => $devid);
	//$arr = array('status' => "Data Saved");
    //echo "Insert Success";
    }
catch(PDOException $e)
    {
	$arr = array('status' => "Connection failed: " . $e->getMessage());
	//arr = array ('deviceID' => "Connection failed: " . $e->getMessage(), 'esn' => $devid);
    //echo "Connection failed: " . $e->getMessage();
   }
echo json_encode($arr);
?>
