import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../styles/ticket-list.scss";

export const tickets = [
  {
    type: "General Admission",
    price: 15.0,
    amountRemaining: 0,
  },
  {
    type: "General Admission 2",
    price: 17.0,
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
  const navigate = useNavigate();

  return (
    <main className="ticket-list">
      <span className="close" onClick={() => navigate(-1)}></span>
      {tickets.map((ticket) => {
        return (
          <div className="ticket-type">
            <div>
              <h3>{ticket.type}</h3>
              <p className="remaining">{ticket.amountRemaining} remaining</p>
              <p className="price">${ticket.price.toFixed(2)}</p>
            </div>
            <button disabled={ticket.amountRemaining < 1}>Buy</button>
          </div>
        );
      })}
    </main>
  );
};

export default TicketList;
