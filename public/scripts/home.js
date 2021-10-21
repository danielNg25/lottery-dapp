$(() => {
    $("#buyTicketContainer").hide();
    console.log("home load");
    $("#connectMMContainer").on("click", () => {
        App.connectMM().then((accounts) => {
            console.log(accounts[0]);
            $("#connectMMContainer").hide();
            $("#buyTicketContainer").show();
        }).catch(() => {
            alert("Could not connect to MetaMask");
        })

    })

    $("#buyTicketBtn").on("click", () => {
        var ticketNumber = $("#inputTicketNumber").val();
        if (ticketNumber.length != 6) {
            alert("Invalid ticket number!");
        } else {
            App.getTicketPrize().then(price => {
                App.buyTicket(price, parseInt(ticketNumber)).then(() => {
                    alert("Buy successful");
                });
            }).catch((err) => {
                alert("An error occurred");
                console.log(err);
            });
        }

    })
});