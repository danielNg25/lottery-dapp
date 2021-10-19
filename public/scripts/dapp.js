App = {
    contracts: {},
    load: async ()=>{
        await App.loadWeb3();
    },
    loadWeb3: async()=>{
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        }
        else{
            console.log('MetaMask is not installed!');
        }

    },
    loadAccount: async()=>{

    },
    loadContract: async()=>{

    }

}
$(()=>{

    console.log("start load");
    App.load();

   
})