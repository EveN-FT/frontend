import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../styles/ticket-list.scss";

export const tickets = [
  {
    type: "General Admission",
    price: 15.0,
    amountRemaining: 150,
  },
  {
    type: "VIP",
    price: 35.0,
    amountRemaining: 30,
  },
  {
    type: "Backstage Pass",
    price: 150.0,
    amountRemaining: 3,
  },
];

const TicketList = () => {
  return (
    <>
      <NavBar />
      <main className="ticket-list">
        {tickets.map((ticket) => {
          return (
            <div className="ticket-type">
              <div>
                <h3>{ticket.type}</h3>
                <p className="remaining">{ticket.amountRemaining} remaining</p>
                <p className="price">${ticket.price.toFixed(2)}</p>
              </div>
              <button>Buy</button>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default TicketList;
