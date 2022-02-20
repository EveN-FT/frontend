import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Event } from "./Explore";
import { tickets } from "./EventMint";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/host.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWeb3React } from "@web3-react/core";

export const events: Event[] = [
  {
    address: "0x4428d5424F822CbF061619bB68FC01d82Db5da11",
    name: "Deadmau5",
    owner:
      "Deadmau5 is playing his 4 millionth show at the Temple Theater in downtown Denver. Wednesday, February 16th from 5:00pm - 2:00am",
    metadata: "",
    imageUrl: "",
    venue: "",
    city: "",
    time: "",
    description: "",
  },
  {
    address: "0x537f2A1C7d368FbCAA8395614a482d9ACf4D9d0D",
    name: "Chainlink Happy Hour",
    owner:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    metadata: "",
    imageUrl: "",
    venue: "",
    city: "",
    time: "",
    description: "",
  },
];

const Host = () => {
  // const { library } = useWeb3React();
  // const signer = library.getSigner();
  // const [realEvents, setRealEvents] = useState<Event[]>();

  // useEffect(() => {
  //   async function myEvents() {
  //     var addr = await signer.getAddress();
  //     var { data } = await axios.post(
  //       "https://beta-even-ft-backend.onrender.com/api/v1/event/list-by-owner",
  //       { ownderAddress: addr }
  //     );
  //     setRealEvents(data);
  //   }
  //   myEvents();
  // }, []);

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
