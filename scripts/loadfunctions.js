

window.onload = loadHomePage(),checkAccountCookie(),loadCSV()

window.addEventListener("load", function(){
 

});


function loadHomePage() {
document.getElementById("home").click()
toggleMenu('Home')
}


function checkAccountCookie() {

var privateKey = getCookie('key')

if (privateKey !== '') {
    connectWallet(privateKey)
}



}





function loadCSV() {

    localStorage.clear();

    sessionStorage.clear()

    var element = document.getElementById("ShopGrid");
    
    let pictureData = [];
    let rewardData = [];
    let rewardtierData = [];
    let rewardpriceData = [];
    
    
    //csvFileInput.addEventListener("change", e => {
        Papa.parse('./rewards.csv', 
            {delimiter: ',',
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                
     //Looping through all rows  
     
     let htmlStr = ''
    
    for (let i = 0; i < results.data.length; i++) {
        
    pictureData.push(results.data[i].picture);
    rewardData.push(results.data[i].reward);
    rewardtierData.push(results.data[i].rewardtier);
    rewardpriceData.push(results.data[i].rewardprice);
    
    
    
    
    
        //Looping through every cell within row
        //for (let k = 0; k < results.data.length; k++) {
    
            htmlStr += '<div class="col" id="' + rewardtierData[i] + '"><img id="rewardimage" src="' + pictureData[i] + '"> ' +
            '<div class="pricedisplay" id="pricedisplay' + i + '">' +
            '<a id="rewardData' + i + '" class="rewardData">' + rewardData[i] + '</a>' + '<br>' +
           
           
           '<a onclick="purchaseItem(' + '\'' + rewardData[i] + '\'' + ',' + '\'' + rewardpriceData[i] + '\'' + ',' + '\'' + rewardtierData[i] + '\'' +')" id="buyReward' + i + '">' + '<div class="centerflexbox">' + '<img id="coinsmall" src="https://raw.githubusercontent.com/mr-sc0/crypto/main/logo.png">'  + rewardpriceData[i] + '</div></a></div>'
            + '</div>'
       
        //}
       
   
    
        }
    
    element.innerHTML = htmlStr
       
        console.log(rewardData)
    
             
            }    
        });
    

    

}


 function loadPurchases() {

    
 }
    
export function loadPurchaseCSV() { 

    var element = document.getElementById("Purchases");
  
    let dateData = [];
    let rewardData = [];
    let rewardtierData = [];
    let rewardpriceData = [];
    let redeemedData = [];
    let accountData = [];
    let transactionData = [];
  
    
    
    //csvFileInput.addEventListener("change", e => {
        Papa.parse('./purchases.csv', 
            {delimiter: ',',
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                
     //Looping through all rows  
     
     let htmlStr = '<table class="purchaseHistorytbl" id="purchaseHistorytbl">' +
                    '<thead>' +
                        '<tr>' +
                        '<th>Date</th>' +
                        '<th>Reward</th>' +
                        '<th>Price</th>' +
                        '<th>Redeemed</th>' +
                        '<th>Account</th>' +
                        '<th>Transaction</th>' +
                        '</tr>' +
                    '</thead>'
    
    for (let i = 0; i < results.data.length; i++) {
        
    dateData.push(results.data[i].date);
    rewardData.push(results.data[i].reward);
    rewardtierData.push(results.data[i].rewardtier);
    rewardpriceData.push(results.data[i].price);
    redeemedData.push(results.data[i].redeemed);
    accountData.push(results.data[i].account);
    transactionData.push(results.data[i].transaction);
    
  
    
            htmlStr += '<tr id="' + rewardtierData[i] + '">' +
                        '<td>'+ dateData[i] + '</td>' +
                        '<td>'+ rewardData[i] + '</td>' +
                        '<td>'+ rewardpriceData[i] + '</td>' +
                        '<td>'+ redeemedData[i] + '</td>' +
                        '<td>'+ accountData[i] + '</td>' +
                        '<td>'+ transactionData[i] + '</td>' +
                        '</tr>'
  
    
        }
  
        htmlStr += '</table>'
    
    element.innerHTML = htmlStr
       
        console.log(rewardData)
    
             
            }    
        });
    
  
  
  }

