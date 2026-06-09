<?php
class DB_Functions {
    private $db;
    public $arr;
    //put your code here
    // constructor
    function __construct() {
        require_once 'my_con.php';
        // connecting to database
        $this->db =  new PDO("mysql:host=$servername;dbname=$database", $username, $password);
	$this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    // destructor
    function __destruct() {
    }
    /**
     * Storing new user
     * returns user details
     */
    public function storeUser( $device_id, $gcm_regid) {
	try{
		$sql = "INSERT INTO tb_room (device_id, gcm_regid,created_at) VALUES (:device_id, :gcm_regid, NOW()) ON DUPLICATE KEY UPDATE gcm_regid=VALUES(gcm_regid), created_at=NOW();";
 		$sth = $this->db->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
		$sth->execute(array(':device_id'=> $device_id, 'gcm_regid'=>$gcm_regid));
	        
		$arr = array('status' => "Data Saved");
	}catch(PDOException $e){
       		 $arr = array('status' => "Connection failed: " . $e->getMessage());
	}catch (Exception $e){
  		 $arr = array('status'=> $e);
   	}
	return $arr;
    }
    /**
     * Getting all users
     */
    public function getAllUsers() {
        //$result = mysql_query("select * FROM gcm_users");
        //return $result;
    }
}
?>
