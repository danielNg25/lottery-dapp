$(() => {

    $("#buyTicketContainer").hide();
    console.log("home load");
    $("#connectMMContainer").on("click", () => {
        App.connectMM().then((accounts) => {
            console.log(accounts[0]);
            //update front-end
            $("#connectMMContainer").hide();
            $("#buyTicketContainer").show();
            App.getAccountBalance().then(balance=>{
               updateYourBalance(balance);
            })
            App.getTodayPrize().then(prize=>{
                updatePrize(prize);
            });
            //listen for event
            listenToPrizeChangeEvent();

        }).catch((err) => {
            alert("Could not connect to MetaMask");
            console.log(err);
        })

    })

    $("#buyTicketBtn").on("click", () => {
        var ticketNumber = $("#inputTicketNumber").val();
        if (ticketNumber.length != 6) {
            alert("Invalid ticket number!");
        } else {
            App.getTicketPrize().then(price => {
                App.buyTicket(price, parseInt(ticketNumber)).then(() => {
                    //$("#inputTicketNumber").html("");
                    alert("Buy successful");
                });
            }).catch((err) => {
                alert("An error occurred");
                console.log(err);
            });
        }

    })

    //listen to events
    
});

//update front end
function updateYourBalance(num){
    $('#yourBalanceText').text(num);
}

function updatePrize(prize){
    prize = web3.utils.fromWei(prize.toString());
    $('#totalPrizeSpan').text(prize);
    
}


function listenToBalanceChangeEvent(){
    App.LotteryResult.onBalanceUpdate({},{
        fromBlock: 0,
        toBlock: 'latest'
    }).watch((err, event)=>{
      if(!err){
          
      }  
    })
}

function listenToPrizeChangeEvent(){
    App.LotteryResult.onPrizeChange({
        filter: {},
        fromBlock: 0,
        toBlock:'latest'
    }, (err, event)=>{
        if(err){
            console.log(err);
        }else{
            var prize = event.returnValues._prize;
            
            console.log(prize);
            updatePrize(prize);
        }
        
    })
}