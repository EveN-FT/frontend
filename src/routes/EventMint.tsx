import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

import "../styles/mint-tickets.scss";

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

const EventMint = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <main className="mint-tickets">
      <span className="close" onClick={() => navigate(-1)}></span>
      <h1>Mint Tickets</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          placeholder="Ticket Type"
          autoFocus
          maxLength={40}
        />
        <label htmlFor="description">Ticket Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Ticket Description"
          rows={3}
          maxLength={140}
        />
        <label htmlFor="image" className="label-show">
          Ticket Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          maxLength={40}
          accept=".png,.jpg,.jpeg"
          title="Upload ticket image"
        />
        <button type="submit">Mint</button>
      </form>
    </main>
  );
};

export default EventMint;
