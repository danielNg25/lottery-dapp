import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import LotteryContext from "../contexts/lotteryContext";
import AddressContext from "../contexts/addressContext";
import { TOKEN_ABI } from "../tokenABI";
import { ZERO_ADDRESS } from "../config";
import Web3 from "web3";
export default function NftList() {
    const [lottery] = useContext(LotteryContext);
    const [addressContext] = useContext(AddressContext);
    const [usersTokens, setUsersTokens] = useState([]);
    useEffect(() => {
        const fetchToken = async () => {
            let tokenCount = await lottery.methods.lotteryTimes().call();
            const web3 = new Web3(window.ethereum);
            for (let i = 1; i<=tokenCount; i++){
                const tokenAddress = await lottery.methods.timesToNFTAddress(i).call();
                const tokenContract = new web3.eth.Contract(
                    TOKEN_ABI,
                    tokenAddress.toString()
                );
                let token = await tokenContract.methods.addressToPlayer(addressContext).call();

                
                if(token.wallet != ZERO_ADDRESS){
                    token.times = i;
                    setUsersTokens((prevTokens) => [...prevTokens, token]);
                }

            }
        }
        fetchToken();
    }, [])

    return (
        <div className="lastWinner">
        <h1 className="totalPlayers">Your Total Token: {usersTokens.length}</h1>
        <table className="playersTable">
          <tbody>
            <tr>
              <th>No</th>
              <th>Times</th>
              <th>Ticket</th>
              <th>Won</th>
            </tr>
            {usersTokens.map((t, index) => {
              return (
                <tr key={uuidv4()}>
                  <td>{index + 1}</td>
                  <td>{t.times}</td>
                  <td>{t.ticket}</td>
                  <td>{t.isWinner.toString()} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}
