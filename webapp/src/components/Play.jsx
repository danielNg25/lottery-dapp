import React, { useState } from "react";
import { useContext, useEffect } from "react";
import Web3 from "web3";
import AddressContext from "../contexts/addressContext";
import LotteryContext from "../contexts/lotteryContext";
import { v4 as uuidv4 } from 'uuid';

export default function Play() {
  const ticketLength = 100;

  const [addressContext, setAddressContext] = useContext(AddressContext);
  const [lottery, setLottery] = useContext(LotteryContext);
  const [ticketPrice, setTicketPrice] = useState("");
  const [ticket, setTicket] = useState("");
  const [balance, setBalance] = useState("0");
  const [ticketToBuy, setTicketToBuy] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(async () => {
    let userBalance = await lottery.methods.balances(addressContext).call();
    setBalance(userBalance);
    let userTicket = await lottery.methods
      .getTicketByAddress(addressContext)
      .call();
    if (userTicket != ticketLength) {
      setTicket(userTicket);
    }
    let price = await lottery.methods.ticketPrice().call();
    setTicketPrice(price);

    let playersCount = await lottery.methods.playersCount().call();

    for (let i = 1; i <= playersCount; i++) {
      let newPlayers = await lottery.methods.playersMap(i).call();

      setPlayers((prevPlayers) => [...prevPlayers, newPlayers]);
    }
  }, [addressContext]);

  const handleBuyTicket = async (e) => {
    e.preventDefault();
    if (ticketToBuy >= 0 && ticketToBuy <= 99) {
      await lottery.methods
        .buyTicket(ticketToBuy)
        .send({ from: addressContext, value: ticketPrice });
    } else {
      alert("Ticket number not valid");
    }
  };

  return (
    <div className="play">
      {addressContext && (
        <div>
          <div className="balance">
            Your balance in contract: {Web3.utils.fromWei(balance, "ether")} ETH
          </div>
          {ticket ? (
            <div className="userTicket">Your ticket: {ticket}</div>
          ) : (
            <>
              <div className="userTicket">
                Try your luck! Ticket Price:{" "}
                {Web3.utils.fromWei(ticketPrice, "ether")} ETH{" "}
              </div>
              <form className="buyTicket">
                <input
                  type="text"
                  id="ticketInput"
                  placeholder="Your ticket must be a 2-digits number"
                  className="ticketInput"
                  onChange={(e) => setTicketToBuy(e.target.value)}
                />
                <button
                  className="ticketSubmit"
                  type="submit"
                  onClick={handleBuyTicket}
                >
                  Buy
                </button>
              </form>
            </>
          )}
        </div>
      )}

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
