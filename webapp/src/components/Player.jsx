import React, { useState } from "react";
import { useContext, useEffect } from "react";
import TokenContext from "../contexts/currentTokenContext";
import { v4 as uuidv4 } from "uuid";
export default function Player() {
  const [token] = useContext(TokenContext);
  const [playersCount, setPlayersCount] = useState();
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const fetchPlayerData = async () => {
      let pCount = await token.methods.tokenId().call();
      setPlayersCount(pCount);
      for (let i = 1; i <= pCount; i++) {
        let newPlayers = await token.methods.idToPlayer(i).call();
        setPlayers((prevPlayers) => [...prevPlayers, newPlayers]);
      }
    };
    fetchPlayerData();
  }, [token]);
  return (
    <div className="lastWinner">
      <h1 className="totalPlayers">Total Players Today: {playersCount}</h1>

      <table className="playersTable">
        <tbody>
          <tr>
            <th>No</th>
            <th>Address</th>
            <th>Ticket</th>
          </tr>

          {players.map((p, index) => {
            return (
              <tr key={uuidv4()}>
                <td>{index + 1}</td>
                <td>{p.wallet}</td>
                <td>{p.ticket}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
