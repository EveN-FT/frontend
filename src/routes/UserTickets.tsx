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
  type?: string,
  description?: string,
  image?: string,
};

const TEST_TICKETS:Ticket[] = [{
  id: 19,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
},{
  id: 18,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
},{
  id: 17,
  owner: "0x42e378336c93fcF06bA92aA313F28DF7d7A2EA5d",
  tokenUri: "metadata",
}]

const UserTickets = () => {
  const { account, library, active, chainId } = useWeb3React();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  var ticketContract = new ethers.Contract(process.env.REACT_APP_TICKET_ADDRESS!, TicketABI, library)

  useEffect(() => {
    var completeTickets: Ticket[] = []
    const fetchTickets = async () => {
      // const { data } = await covalent.get(`/address/${account}/balances_v2/?key=${process.env.REACT_APP_COVALENT_KEY}`)
      //data.items
      for (const t of TEST_TICKETS) {
        try {
          const eventAddress = await ticketContract.eventAddress(t.id)
          var tokenUri = await ticketContract.tokenURI(t.id)
          const contract = new ethers.Contract(eventAddress, EventABI, library);
          const name = await contract.name();
          t.tokenUri = tokenUri;
          if (tokenUri.startsWith("ipfs://")) {
            tokenUri = `https://ipfs.io/ipfs/${tokenUri.split("/").pop()}`;
          }
          const {data} = await axios.get(tokenUri);
          var imageUri = data.image.url.ORIGINAL;
          if (imageUri.startsWith("ipfs://")) {
            imageUri = `https://ipfs.io/ipfs/${imageUri.split("/").pop()}`;
          }
          t.description = data.description;
          t.type = data.name;
          t.image = imageUri;
          t.eventAddress = eventAddress;
          t.event = {
            address: eventAddress,
            name: name,
          };
          completeTickets.push(t);
        } catch (err) {
          continue
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
                  <Link to={`/event/${ticket.event!.address}`} key={key}>
                    <div className="event-description">
                      <h1>{ticket.event?.name}</h1>
                      <p className="description">{ticket?.description}</p>
                      <p className="description">{ticket?.type}</p>
                    </div>
                  </Link>
                  <div className="event-media">
                    <img src={ticket?.image} alt={ticket.event?.name} />
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
