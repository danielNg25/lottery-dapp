import React, { useState } from "react";
import { useContext, useEffect } from "react";
import Web3 from "web3";
import AddressContext from "../contexts/addressContext";
import LotteryContext from "../contexts/lotteryContext";

export default function Play() {
  const ticketLength = 5;

  const [addressContext] = useContext(AddressContext);
  const [lottery] = useContext(LotteryContext);

  const [ticketPrice, setTicketPrice] = useState("");
  const [ticket, setTicket] = useState("");
  const [balance, setBalance] = useState("0");
  const [ticketToBuy, setTicketToBuy] = useState("");
  const [amountWithdraw, setAmountWithdraw] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      let userBalance = await lottery.methods.balances(addressContext).call();

      setBalance(userBalance);
      let userTicket = await lottery.methods
        .getTicketByAddress(addressContext)
        .call();
      console.log(userBalance);
      if (userTicket != ticketLength) {
        setTicket(userTicket);
      }
      let price = await lottery.methods.ticketPrice().call();
      setTicketPrice(price);
    };
    fetchUserData();
  }, [addressContext]);

  const handleBuyTicket = async (e) => {
    e.preventDefault();
    if (ticketToBuy >= 0 && ticketToBuy <= 4) {
      await lottery.methods
        .buyTicket(ticketToBuy)
        .send({ from: addressContext, value: ticketPrice });
    } else {
      alert("Ticket number not valid");
    }
  };

  const handleWithDraw = async (e) => {
    e.preventDefault();
    if (amountWithdraw > 0 && amountWithdraw <= balance) {
      await lottery.methods
        .withdraw(Web3.utils.toWei(amountWithdraw))
        .send({ from: addressContext });
    } else {
      alert("Amount not valid");
    }
  };
  return (
    <div className="play">
      {addressContext && (
        <div>
          <div className="balance">
            <form className="withDraw">
              <input
                type="text"
                id="amountToWithDraw"
                placeholder="Ether amount to withdraw"
                className="withDrawInput"
                onChange={(e) => setAmountWithdraw(e.target.value)}
              />
              <button className="withDrawButton" onClick={handleWithDraw}>
                With Draw
              </button>
            </form>
            Your balance in contract: {Web3.utils.fromWei(balance, "ether")} ETH
          </div>
          {ticket ? (
            <div className="userTicket">
              You have already bought a ticket this time. Your ticket number:{" "}
              {ticket}
            </div>
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
                  placeholder="Your ticket must be a number less than 5"
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
    </div>
  );
}
