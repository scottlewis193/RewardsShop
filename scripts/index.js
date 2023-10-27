

//Token Program Public Key

let tokenProgramPK = new solanaWeb3.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")


//Token Public Key
 let tokenPK = new solanaWeb3.PublicKey("6WaJfGoV2C5GsjjzkpsfPzkcadbXL1qVm3LGzS4fSBqs")

 //Sender Token Account Public Key

 let sendTokenAccountPK
 
 //Sender Wallet Key Pair
 let sendWalletKP

 //Sender Wallet Public Key
 let sendWalletPK

 let recieveTokenAccountPK = new solanaWeb3.PublicKey("9ZWG1ka1tE3CYxwj62VPBMf75VLcHL2ECs496cEUNJ7B")

 //Reciever Wallet Public Key
 let recieveWalletPK = new solanaWeb3.PublicKey("Dg2P9fQEisciotjK7W2sbWjjA7vdSfiRq34y14to8AtW")

 // Solana Connection
 let connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"), 'confirmed');

 // Last Transaction Signature
 let signature

 var hasShopSorted = 0



 function setShopSort() {

if (hasShopSorted == 0) {

  sortShopItems('Name')

  hasShopSorted = 1
}


 }


function sortShopItems(selectValue) {
var mylist = document.getElementById('ShopGrid');

var divs = mylist.getElementsByClassName('col');
var listitems = [];
for (i = 0; i < divs.length; i++) {
  var pricedisplay = divs.item(i).childNodes[2];
  var nodetofilter
  if (selectValue == 'Name') {
  nodetofilter  = pricedisplay.childNodes[0];
} else if(selectValue == 'Price') {
  nodetofilter  = pricedisplay.childNodes[2];
}  
  
  listitems.push(nodetofilter);
}
listitems.sort(function(a, b) {
 
  var compA = a.innerText.toUpperCase()
  var compB = b.innerText.toUpperCase()
 

  if(selectValue == 'Price') {
    return (parseFloat(compA) < parseFloat(compB)) ? -1 : (parseFloat(compA) > parseFloat(compB)) ? 1 : 0;
  } else {
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  }
    
});
for (i = 0; i < listitems.length; i++) {
 
    mylist.appendChild(document.getElementById(document.getElementById(listitems[i].id).parentElement.id).parentElement);

}
}



function openPage(evt, Page) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(Page).style.display = "block";
    evt.currentTarget.className += " active";


  }

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function toggleMenu(newItem) {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
    if (newItem != '') {
   var y = document.getElementById("active");
   y.innerHTML = newItem;
}


  }

  function openModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = 'flex';
  }

  function closeModal(id) {
    var modal = document.getElementById(id);
    modal.style.display = 'none';
  }

  function openPurchaseModal() {
    var modal = document.getElementById('modalPurchase');

    modal.style.display = 'flex';
  }
  

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == document.getElementById("myModal")) {
//     closeModal();
//   }
// }


async function getBalance() {

//Get SOL balance
const tokenObj = {mint:tokenPK}
connection.getBalance(sendWalletPK).then(function(value) {console.log(value / 1000000000)});

//Get Users Token Account
var userTokenAccountPK
var balance = document.getElementById("balance")
balance.innerHTML = 'Loading...'

const result = connection.getTokenAccountsByOwner(sendWalletPK,tokenObj);
result
.then (data => {console.log(data.value[0].pubkey.toBase58()), sendTokenAccountPK = new solanaWeb3.PublicKey(data.value[0].pubkey.toBase58())
                , userTokenAccountPK = new solanaWeb3.PublicKey(data.value[0].pubkey.toBase58())

                //GET CHAZ balance
                , connection.getTokenAccountBalance(userTokenAccountPK).then(data => {console.log(data.value.amount / 1000000000),
                                                                              balance.innerHTML = data.value.amount / 1000000000 + ' CHAZ'}) })
      var connectWalletbtn = document.getElementById("wallet")
      connectWalletbtn.style.display = 'none'
      var balancedisplay = document.getElementById('balancedisplay')
      balancedisplay.style.display = 'block'

}


async function connectWallet(privateKey, checked = false) {



//Set Send Wallet Objects
 sendWalletKP = solanaWeb3.Keypair.fromSecretKey(new Uint8Array(Base58.decode(privateKey)))
 sendWalletPK = new solanaWeb3.PublicKey(sendWalletKP.publicKey.toBase58())
 
 var htmlpublicKey = document.getElementById("publicKey")
 htmlpublicKey.innerText = sendWalletPK

 var accountLink = document.getElementById("account")
 accountLink.href = "https://solscan.io/account/" + sendWalletPK



// Get Token Balance
getBalance() 


//CREATE COOKIE
if (checked == true) {
  setCookie('key',privateKey,365)
}



//CLOSE MODAL
closeModal('modalWallet');                                                               

}





function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  const d = new Date();
  d.setTime(d.getTime());
  let expires = "expires=" + d.toUTCString();
document.cookie = cname + "=;" + expires + ";path=/";

location.reload();

}




function purchaseItem(reward,amount,tier) {
  var walletBtn = document.getElementById("wallet")
  var balance = String(document.getElementById("balance").innerText).replace(" CHAZ", "")
  var errorText = document.getElementById("error")
  
  if (window.getComputedStyle(walletBtn).display === 'block') {
    errorText.innerText = "Please Connect A Wallet!"
    openModal('modalError');
    return;
  }

  if (parseFloat(balance) < amount) {
    errorText.innerText = "You Don't Have Enough To Make This Purchase :("
    openModal('modalError')
    return;
  }


  var purchaseBalance = document.getElementById('purchaseBalance')
  purchaseBalance.innerText = balance
  var purchasePrice = document.getElementById('purchasePrice')
  purchasePrice.innerHTML = amount
  var purchaseBalanceLeft = document.getElementById('purchaseBalanceLeft')
  let balanceLeft = balance - amount
  purchaseBalanceLeft.innerText = balanceLeft
  var purchaseReward = document.getElementById('purchaseReward')
  purchaseReward.innerText = reward
  var purchaseTier = document.getElementById('purchaseTier')
  purchaseTier.innerText = tier

 openPurchaseModal()


}

async function completePurchase(purchasePrice,purchaseReward = 'test',purchaseTier = 'Gold') {


  // Create Transaction
  var manualTransaction = new solanaWeb3.Transaction().add(
    splToken.Token.createTransferInstruction(
      tokenProgramPK,
      sendTokenAccountPK,
      recieveTokenAccountPK,
      sendWalletPK,
      [],
      purchasePrice * 1000000000
    )
    )


    closeModal('modalPurchase')

    var transactionTitle = document.getElementById('transactionTitle');
    transactionTitle.innerText = "Confirming Transaction...";
    transactionTitle.style = "color:white";
    var check = document.getElementById('lblCheck');
    check.style = "display:inline-block;"


    openModal('modalTransactionConfirm')

    try {

    // Send and confirm transaction
    signature = await solanaWeb3.sendAndConfirmTransaction(connection, manualTransaction, [sendWalletKP])
    
    var htmllatestTransaction = document.getElementById("latestTransaction")
    htmllatestTransaction.innerText = signature

    //console.log('SIGNATURE', signature);
    //const signature = "sig"

   //Confirmed transaction
    var transactionTitle = document.getElementById('transactionTitle');
    transactionTitle.innerText = "Transaction Confirmed!";
    var checkBox = document.getElementById('check');
    checkBox.checked = true;

  }
catch(err) {
  
  var transactionTitle = document.getElementById('transactionTitle');
  transactionTitle.innerText = "Transaction Failed!";
  transactionTitle.style =  "color:red";
  var check = document.getElementById('lblCheck');
  check.style = "display:none;"

}


    // Refresh Balance

    getBalance();


    //Close modal after 3 secs

    setTimeout(function() {closeModal('modalTransactionConfirm')

    var checkBox = document.getElementById('check');
    if (checkBox.checked == true) {

    //Insert record into purchases table (sql)

  var transSignature = document.getElementById('transSignature')
  transSignature.value = signature
  var transPrice = document.getElementById('transPrice')
  transPrice.value = purchasePrice
  var transReward = document.getElementById('transReward')
  transReward.value = purchaseReward
  var transTier = document.getElementById('transTier')
  transTier.value = purchaseTier
  var transPublicKey = document.getElementById('transPublicKey')
  transPublicKey.value = sendWalletPK

  var Transbtn = document.getElementById('getTransBtn')
  Transbtn.click();

}

      },3000)

}

function exportCSV(arrayHeader, arrayData, delimiter, fileName) {
  let header = arrayHeader.join(delimiter) + '\n';
  let csv = header;
  arrayData.forEach( obj => {
      let row = [];
      for (key in obj) {
          if (obj.hasOwnProperty(key)) {
              row.push(obj[key]);
          }
      }
      csv += row.join(delimiter)+"\n";
  });

  let csvData = new Blob([csv], { type: 'text/csv' });  
  //let csvUrl = URL.createObjectURL(csvData);

saveAs(csvData,"purchases.csv")

  // let hiddenElement = document.createElement('a');
  // hiddenElement.href = csvUrl;
  // hiddenElement.target = '_blank';
  // hiddenElement.download = fileName + '.csv';
  // hiddenElement.click();
}



  
  
  

