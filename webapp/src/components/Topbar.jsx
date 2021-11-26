import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AddressContext from "../contexts/addressContext";
import LotteryContext from "../contexts/lotteryContext";
import TokenContext from "../contexts/currentTokenContext";
import LastTokenContext from "../contexts/lastTokenContext";
import Web3 from "web3";
import { LOTTERY_ABI,LOTTERY_ADDRESS_BSC_TESTNET, LOTTERY_ADDRESS } from "../lottery";
import {ADMIN_ADDRESS} from "../config";
import { TOKEN_ABI } from "../tokenABI";
export default function Topbar(props) {
  const [addressContext, setAddressContext] = useContext(AddressContext);
  const [lottery, setLottery] = useContext(LotteryContext);
  const [token, setToken] = useContext(TokenContext);
  const [lastToken, setLastToken] = useContext(LastTokenContext);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleConnectMM = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // We are in the browser and metamask is running.
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const web3 = new Web3(window.ethereum);
      setAddressContext(accounts[0]);
     

      if (accounts[0] == ADMIN_ADDRESS) {
        setIsAdmin(true);
      }
      
      const lotteryContract = new web3.eth.Contract(
        LOTTERY_ABI,
        LOTTERY_ADDRESS_BSC_TESTNET
      );
      setLottery(lotteryContract);

      const NFTTokenAddress = await lotteryContract.methods.ticketNFT().call();
      const NFTToken = new web3.eth.Contract(
        TOKEN_ABI,
        NFTTokenAddress.toString()
      );
      setToken(NFTToken);
      const lotteryTime = await lotteryContract.methods.lotteryTimes().call();
      const lastTokenAddress = await lotteryContract.methods.timesToNFTAddress(lotteryTime-1).call();
      const lastNFTToken = new web3.eth.Contract(
        TOKEN_ABI,
        lastTokenAddress.toString()
      );
      setLastToken(lastNFTToken);
      
    }
    // // Legacy DApp Browsers
    // else if (window.web3) {
    //   const web3 = new Web3(window.web3.currentProvider);
    // }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
      return;
    }
  };

  const handleSetResult = async () =>{
    await lottery.methods.setResult().send({from : addressContext})
  }

  const handleStartLottery = async () => {
    if (addressContext == ADMIN_ADDRESS) {
      await lottery.methods.firstTimeSetUp().send({ from: addressContext });
    } else {
      alert("dcm");
    }
  };
  return (
    <div className="top">
      <div className="topLeft">
        <h3 className="topTitle">ETH Lottery</h3>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              BUY A TICKET
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/win" className="link">
              LAST WINNER
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/player" className="link">
              ALL PLAYERS
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/nft" className="link">
              YOUR NFT
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {addressContext ? (
          <h3 className="topTitle">{addressContext}</h3>
          
        ) : (
          <button className="connectMM" onClick={handleConnectMM}>
            Connect MM
          </button>
        )}
        {isAdmin && (
          <button className="connectMM" onClick={handleSetResult}>
            Set Result
          </button>
        )}
      </div>
    </div>
  );
}
