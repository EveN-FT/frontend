import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import UserRedeem from '../components/UserRedeem';
import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/explore.scss";
import { Event } from "../routes/Explore";
import covalent from "../utils/covalent";
import TicketABI from '../assets/TicketABI.json';
import EventABI from "../assets/EventABI.json";
import axios from "axios";

export type Ticket = {
  eventAddress?: string;
  owner: string;
  tokenUri: string;
  id: number;
  event?: Event;
};

const TEST_TICKETS:Ticket[] = [{
  id: 1,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
},{
  id: 2,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
},{
  id: 3,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
}]

const UserTickets = () => {
  const { account, library, active, chainId } = useWeb3React();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [tryRedeem, setRedeem] = useState(false)
  var ticketContract = new ethers.Contract(process.env.REACT_APP_TICKET_ADDRESS!, TicketABI, library)

  useEffect(() => {
    var completeTickets: Ticket[] = []
    const fetchTickets = async () => {
      // const { data } = await covalent.get(`/address/${account}/balances_v2/?key=${process.env.REACT_APP_COVALENT_KEY}`)
      //data.items
      for (const t of TEST_TICKETS) {
        try {
          const eventAddress = await ticketContract.eventAddress(t.id)
          const tokenUri = await ticketContract.tokenURI(t.id)
          const contract = new ethers.Contract(eventAddress, EventABI, library);
          const name = await contract.name();
          t.tokenUri = tokenUri;
          t.eventAddress = eventAddress;
          t.event = {
            address: eventAddress,
            name: name,
          };
          completeTickets.push(t);
        } catch (err) {
          return
        }
      };
      setTickets(completeTickets);
    };
    fetchTickets();
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      <main className="explore">
        {tickets && tickets.map((ticket, key) => {
          return (
            <React.Fragment key={key}>
              <div className="event-hero">
                <div className="event-description">
                <Link to={`/event/${ticket.event!.address}`} key={key}>
                  <h1>{ticket.event?.name}</h1>
                </Link>
                </div>
                <div className="event-media">
                  <img src={eventImage} alt={ticket.event?.name} />
                </div>
              </div>
              <Link to={`/user/redeem/${ticket.id}`}>
                <button>Redeem Ticket</button>
              </Link>
              </React.Fragment>
          );
        })}
      </main>
    </>
  );
};

export default UserTickets;
