import Web3 from "web3";
import React, { useState } from "react";
import { useContext, useEffect } from "react";


import LotteryContext from "../contexts/lotteryContext"
export default function Header() {
  const [lottery] = useContext(LotteryContext);
  const [prize, setPrize] = useState("");
  useEffect( () =>{
    const fetchTicketPrize = async() => {
    let ticketPrize = await lottery.methods.todaysPrize().call();
    console.log(ticketPrize);
    setPrize(ticketPrize);
    }
    fetchTicketPrize();
  }, [lottery])
  return (
    <div className="header">
      <div className="todayPrize">Today's Prize: {Web3.utils.fromWei(prize, 'ether')} ETH</div>
    </div>
  );
}
