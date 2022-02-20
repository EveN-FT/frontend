import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Event } from "./Explore";
import { tickets } from "./EventMint";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/host.scss";

export const events: Event[] = [
  {
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
    name: "Deadmau5",
    owner:
      "Deadmau5 is playing his 4 millionth show at the Temple Theater in downtown Denver. Wednesday, February 16th from 5:00pm - 2:00am",
    metadata: "",
  },
  {
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
    name: "Chainlink Happy Hour",
    owner:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    metadata: "",
  },
];

const Host = () => {
  return (
    <>
      <NavBar />
      <main className="host">
        <div className="host-bar">
          <h1>Your events</h1>
          <Link to="/event/new">
            <button>Create Event</button>
          </Link>
        </div>
        {events.map((event) => {
          return (
            <Link to={`/event/${event.address}`}>
              <div className="event-hero">
                <div className="event-description">
                  <h1>{event.name}</h1>
                  <p className="description">{event.owner}</p>
                  {tickets.map((ticket) => {
                    return (
                      <div className="ticket-type">
                        <div>
                          <h3>{ticket.type}</h3>
                          <p className="remaining">
                            {ticket.amountRemaining} remaining
                          </p>
                          <p className="price">${ticket.price.toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                  <Link to={`/event/${event.address}/mint`}>
                    <button>Mint Tickets</button>
                  </Link>
                </div>
                <div className="event-media">
                  <img src={eventImage} alt={event.name} />
                </div>
              </div>
            </Link>
          );
        })}
      </main>
    </>
  );
};

export default Host;
