import { useContext } from "react";
import { Link } from "react-router-dom";
import AddressContext from "../contexts/addressContext";
import LotteryContext from "../contexts/lotteryContext";
import Web3 from "web3";
import { LOTTERY_ABI, LOTTERY_ADDRESS } from "../lottery";
export default function Topbar(props) {
  const [addressContext, setAddressContext] = useContext(AddressContext);
  const [lottery, setLottery] = useContext(LotteryContext);
  const handleConnectMM = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      // We are in the browser and metamask is running.
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const web3 = new Web3(window.ethereum);
      setAddressContext(accounts[0]);
      const lotteryContract = new web3.eth.Contract(LOTTERY_ABI, LOTTERY_ADDRESS);
      console.log(lotteryContract);
      setLottery(lotteryContract);
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
      </div>
    </div>
  );
}
