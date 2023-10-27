<?php
ini_set('display_errors', 1);
$servername = "sql109.byetcluster.com";
$username = "epiz_30637749";
$password = "zMvI1Yt4E0GA";
$dbname = "epiz_30637749_therewardsstore";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


$reward = $_GET['transReward'];
$rewardtier = $_GET['transTier'];
$rewardprice = $_GET['transPrice'];
$redeemed = 0;
$account = $_GET['transPublicKey'];
$transaction = $_GET['transSignature'];


  $sql = "INSERT INTO purchasehistory (date,reward,rewardtier,price,redeemed,account,transaction)
  VALUES ('" . date('Y-m-d') . "','" . $reward . "','" . $rewardtier . "'," . $rewardprice . "," . $redeemed . ",'" . $account . "','" . $transaction . "')";
  
   if ($conn->query($sql) === TRUE) {
    header("Location: index.php");
     //echo "New record created successfully";
  } else {
    header("Location: index.php");
     //echo "Error: " . $sql . $conn->error . "";
   }




$conn->close();



?>