import { useContext } from "react";
import { Link } from "react-router-dom";
import AddressContext from "../contexts/addressContext";
export default function Topbar(props) {
  const [addressContext, setAddressContext] = useContext(AddressContext);

  const handleConnectMM =  () =>{
    props.connectMM();
  }

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
          <h3 className="topTitle">Your Wallet</h3>
        ) : (
          <button className="connectMM" onClick={handleConnectMM}>Connect MM</button>
        )}
      </div>
    </div>
  );
}
