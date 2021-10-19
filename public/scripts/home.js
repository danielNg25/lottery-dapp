$(()=>{
    console.log("home load");
    $("#connectMMContainer").on("click", ()=>{
        ethereum.request({ method: 'eth_requestAccounts' });
    })

});