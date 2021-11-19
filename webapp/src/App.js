import "./App.css";
import Play from "./components/Play";
import Topbar from "./components/Topbar";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LastWin from "./components/LastWin";
import AddressContext from "./contexts/addressContext";
import Web3Context from "./contexts/web3Context";
import { useState } from "react";
import Web3 from "web3";
function App() {
  const [web3, setWeb3] = useState();
  const [address, setAddress] = useState();

  const connectMM = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // We are in the browser and metamask is running.
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setWeb3(new Web3(window.ethereum));
      console.log(web3.eth.accounts);
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
      console.log(web3.eth.accounts);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };

  return (
    <Router>
      <Web3Context.Provider value={[web3, setWeb3]}>
        <AddressContext.Provider value={[address, setAddress]}>
          <Topbar web3={web3} connectMM={connectMM} />
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <div className="App">
                  <Play />
                </div>
              }
            ></Route>
            <Route
              path="/win"
              element={
                <div className="App">
                  <LastWin />
                </div>
              }
            ></Route>
          </Routes>
        </AddressContext.Provider>
      </Web3Context.Provider>
    </Router>
  );
}

export default App;
