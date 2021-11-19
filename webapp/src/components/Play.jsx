import React from "react";

export default function Play() {
  return (
    <div className="play">
      <div className="balance">Your balance in contract: 100 ETH</div>
      <div className="userTicket">Your ticket: 123456</div>
      <form className="buyTicket">
        <input
          type="text"
          id="ticketInput"
          placeholder="Your ticket must be a 6-digits number"
          className="ticketInput"
        />
        <button className="ticketSubmit" type="submit">
          Buy
        </button>
      </form>
      <table className="playersTable">
        <tbody>
          <tr>
            <th>No</th>
            <th>Address</th>
            <th>Ticket</th>
          </tr>
          <tr>
            <td>1</td>
            <td>0x73f5D11F90257f9C4B280758a6E6E893ed9a43c4</td>
            <td>1234</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
