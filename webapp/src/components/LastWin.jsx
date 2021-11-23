import React from "react";
import { useContext, useState, useEffect } from "react";
import LastTokenContext from "../contexts/lastTokenContext";
import { v4 as uuidv4 } from "uuid";
import Web3 from "web3";
export default function LastWin() {
  const [lastToken] = useContext(LastTokenContext);
  const [players, setPlayers] = useState([]);
  const [playersCount, setPlayersCount] = useState("0");
  const [lastPrize, setLastPrize] = useState("0");
  useEffect(() => {
    const fetchLastPrize = async() => {
      let pCount = await lastToken.methods.winnersCount().call();
      setPlayersCount(pCount);
      for (let i = 1; i <= pCount; i++) {
        let newPlayers = await lastToken.methods.winnersMap(i).call();
        setPlayers((prevPlayers) => [...prevPlayers, newPlayers]);
      }
      let prize = await lastToken.methods.prize().call();
      setLastPrize(prize);
    }
    fetchLastPrize();
  }, [lastToken]);
  return (
    <div className="lastWinner">
      <h1 className="totalPlayers">Total Winners Last Time: {playersCount}</h1>
      <table className="playersTable">
        <tbody>
          <tr>
            <th>No</th>
            <th>Address</th>
            <th>Ticket</th>
            <th>Prize</th>
          </tr>
          {players.map((p, index) => {
            return (
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{p.wallet}</td>
                <td>{p.ticket}</td>
                <td>{Web3.utils.fromWei(lastPrize, "ether")} ETH</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
