

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <link rel="stylesheet" href="css/index.css">
  <script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js"></script>
  <script src="https://unpkg.com/@solana/spl-token@0.1.8/lib/index.iife.js"></script>
  <script src="https://unpkg.com/tweetnacl@1.0.3/nacl.js"></script>
  <script src="https://unpkg.com/file-saver@2.0.5/src/FileSaver.js"></script>
  <script src="./scripts/index.js"></script>
  <script src="./scripts/papaparse.min.js"></script>
  <script type='module' src='./scripts/loadfunctions.js'></script>
  <script src="Base58.js"></script>


  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter&family=Roboto&display=swap" rel="stylesheet">

  <!-- Load an icon library to show a hamburger menu (bars) on small screens -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <title>Jamie's Reward Store</title>
</head>
<body>
  






<div class = "fullwidth-center-content">
<div class="container">
<!-- Tab content -->

<div id="Home" class="tabcontent">
  <p>The place to swap your hard-earned coins for rewards.</p>
  <p>CHARLIE COIN (CHAZ) ONLY ACCEPTED</p>
</div>

<div id="Shop" class="tabcontent">
  <p></p>
  <label for="itemSort">Sort By:</label>
<select oninput="sortShopItems(document.getElementById('itemSort').options[document.getElementById('itemSort').selectedIndex].text)" name="itemSort" id="itemSort">
  <option value="Name">Name</option>
  <option value="Price">Price</option>
</select>

<div id="ShopGrid">

</div>
      
</div>

<div id="Purchases" class="tabcontent">

<br>
<!-- Load Purchase History -->

<?php
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

$sql = "SELECT id, date, reward, rewardtier, price, redeemed, account, transaction FROM purchasehistory";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  echo "<div class='purchases'>";
  while($row = $result->fetch_assoc()) {
    $redeemedbool = ($row["redeemed"]==1)?'True':'False';
    echo "<div class='purchaserow' id='" . $row["rewardtier"]. "'><a class='purchaseid'>" . $row["id"]. "</a><a class='purchasedate'> " . $row["date"]. "</a><a class='purchasetitle'>Reward:</a><a class='purchasereward'>" . $row["reward"]. "</a><a class='purchaserewardtier'>" . $row["rewardtier"]. "</a><a class='purchasetitle'>Price:</a><a class='purchaseprice'>" . $row["price"]. "</a><a class='purchasetitle'>Redeemed:</a><a class='purchaseredeemed'>" . $redeemedbool . "</a><a class='purchasetitle'>Account:</a><a class='purchaseaccount' href='https://solscan.io/account/" . $row["account"]. "'>" . $row["account"]. "</a><a class='purchasetitle'>Transaction:</a><a class='purchasetransaction' href='https://solscan.io/tx/" . $row["transaction"]. "'>". $row["transaction"]."</a></div>";
  }
  echo "</div>";
} else {
  echo "0 results";
}

$conn->close();
?>




</div>

<div id="Guidelines" class="tabcontent">

<p>Earn a maximum of 100 CHAZ per day</p>
<br>
<p id="underlinetitle">Behavior</p>
<p>A* - 40</p>
<p>A - 30</p>
<p>B - 20</p>
<p>C - 10</p>
<p>D - 0</p>
<p>E - -10</p>
<p>F - -20</p>
<br>
<p id='underlinetitle'>Homework/Extra Learning</p>
<p>A* - 30</p>
<p>A - 20</p>
<p>B - 10</p>
<p>C - 0</p>
<br> 
<p id='underlinetitle'>Chores/Tasks</p>
<p>A* - 30</p>
<p>A - 20</p>
<p>B - 10</p>
<p>C - 0</p>
<br> 



</div>




</div>
</div>
</div>




<!-- Tab links -->
<div class="fullwidth-center-content">
  <div class= "title-format">
   
    <a class="title">Jamie's Reward Store</a>
    
  
  </div>
  </div>
  
  <div class = "fullwidth-center-content">
  
  
  <div class="tab">
  
    <a class="active" id="active">Home</a>
    <!-- <img class="active" width=50 height=50 id="logo" src="https://raw.githubusercontent.com/mr-sc0/crypto/main/logo.png"></img> -->
    <div id="myLinks">
    <a class="tablinks" id="home" onclick="openPage(event, 'Home'),toggleMenu('Home')">Home</a>
     <a class="tablinks" id ="shop" onclick="openPage(event, 'Shop'),toggleMenu('Shop'),setShopSort()">Shop</a>
     <a class="tablinks" id ="guidelines" onclick="openPage(event, 'Guidelines'),toggleMenu('Guidelines')">Guidelines</a>
     <a class="tablinks" id ="purchases" onclick="openPage(event, 'Purchases'),toggleMenu('Purchases')">Purchases</a>
    </div>
    
  
    <a href="javascript:void(0);" class="icon" onclick="toggleMenu('')">
      <i class="fa fa-bars"></i>
    </a>
  </div>
  </div>
  




<div class="fullwidth-center-content">
<div class="tab-bottom">
  
    <a class="wallet" id="wallet" onclick="openModal('modalWallet')">Connect Wallet</a>
    <div id='balancedisplay'>
      <div id='balancebox'>
      <img id='coinbig' src="https://raw.githubusercontent.com/mr-sc0/crypto/main/logo.png"><a id='tokenName' class='tokenName'>Charlie Coin</a><br><a class="balance" id="balance"></a>
    </div>

    <a href="javascript:void(0);" class="icon" id='account' onclick="">
      <i class="fa fa-user"></i>
    </a>
<br>
    <a href="javascript:void(0);" class="icon" id='settings' onclick="openModal('modalSettings')">
      <i class="fa fa-cog"></i>
    </a>
    </div>


  
</div>
</div>



<div id="modalWallet" class="modalWallet">
 
  <div class="modal-content">
   
    <span class="close" onclick="closeModal('modalWallet')">&times;</span>
    <form class="connectWallet">
      <label>Enter Private Key:</label>
      <input type="password" id="privateKey" name="privateKey"><br>
      <input type="checkbox" id="rememberMe" name="rememberMe">
      <label for="rememberMe">Remember Me</label>
      <br>
      <input type="button" value="Submit" onclick="connectWallet(this.form.privateKey.value, this.form.rememberMe.checked)"/>
  </form>
</div>

</div>

<div id="modalError" class="modalError">
 
  <div class="modal-content">
   
    <span class="close" onclick="closeModal('modalError')">&times;</span>
    <form class="formError">
      <br>
      <label id="error">Please Connect A Wallet!</label><br>
      <input type="button" value="Ok" onclick="closeModal('modalError')"/>
  </form>
</div>

</div>


<div id="modalPurchase" class="modalPurchase">
 
  <div class="modal-content" >
   
    <span class="close" onclick="closeModal('modalPurchase')">&times;</span>
    <br><label id='purchaseTitle'>Are You Sure You Want To Make This Purchase?</label><br><br>
    <form class="itemPurchase">  
    <label style='display:none' id='purchaseReward' name='purchaseReward'></label>
      <label style='display:none' id='purchaseTier' name='purchaseTier'></label>
      <label id='purchaseBalance'>0</label><br>
     <label id='purchasePriceMinus'>-</label><label id='purchasePrice' name='purchasePrice'>0</label><br>
     <label>──────</label><br>
     <label id='purchaseBalanceLeft'>0</label><br><br> 
      <input type="button" value="Yes" id='yesBtn' onclick="completePurchase(parseFloat(document.getElementById('purchasePrice').innerText),document.getElementById('purchaseReward').innerText,document.getElementById('purchaseTier').innerText)"/>
      <input type="button" id='noBtn' value="No" onclick="closeModal('modalPurchase')"/>
  </form>
</div>


</div>

<div id="modalTransactionConfirm" class="modalTransactionConfirm">

<div class="modal-content" id='modalTransactionConfirmContent'>

<!-- For getting transactions to insert into SQL Table -->
<form method="get" class="transactionDetails" action="insertrecord.php">
  <input type="submit" name="getTransactionDetails" id="getTransactionDetails"/>
  <input type="text" id="transSignature" name="transSignature"/>
  <input type="text" id="transPrice" name="transPrice"/>
  <input type="text" id="transReward" name="transReward"/>
  <input type="text" id="transTier" name="transTier"/>
  <input type="text" id="transPublicKey" name="transPublicKey"/>
  <input type="submit" id="getTransBtn"/>
  </form>
<!-- ------------------------------------------------------- -->


  <br><label id='transactionTitle'>Confirming Transaction...</label><br><br>

  <input type="checkbox" id="check">
  <label id='lblCheck' for="check">
     <div class="check-icon" id="check-icon"></div>
  </label>

</div>

</div>

<div id="modalSettings" class="modalSettings">
 
  <div class="modal-content">
   
    <span class="close" onclick="closeModal('modalSettings')">&times;</span>
    <form class="formSettings">
      <br>
      <input type="button" value="Disconnect Wallet" id="disconnectWallet" onclick="deleteCookie('key')"/>
  </form>
</div>

</div>


<a class="publicKey" id="publicKey"></a>
<a class="latestTransaction" id="latestTransaction"></a>


</body>
</html>
