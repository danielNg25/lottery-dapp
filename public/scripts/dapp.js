App = {
    contracts: {},
    load: async() => {
        await App.loadWeb3();
        await App.loadContract();
    },
    loadWeb3: async() => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            console.log('MetaMask is not installed!');
        }
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                // Request account access if needed
                await ethereum.enable()
                    // Acccounts now exposed
                web3.eth.sendTransaction({ /* ... */ })
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
                // Acccounts always exposed
            web3.eth.sendTransaction({ /* ... */ })
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }

    },
    loadAccount: async() => {

    },
    loadContract: async() => {
        const contractJson = await $.getJSON('./truffle/BaseLottery.json');
        console.log(contractJson);
        App.contracts.BaseLottery = TruffleContract(contractJson);
        App.contracts.BaseLottery.setProvider(App.web3Provider);
        App.BaseLottery = await App.contracts.BaseLottery.deployed();
    },

    connectMM: async() => {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        App.account = accounts[0];
        web3.eth.defaultAccount = accounts[0];
        return accounts;
    },
    getTicketPrize: async() => {
        var price = await App.BaseLottery.ticketPrice();
        return price.toNumber();
    },
    buyTicket: async(price, ticketNumber) => {
        await App.BaseLottery.buyTicket(ticketNumber, { from: App.account, value: price });
    }

}

$(() => {

    console.log("start load");
    App.load();


})