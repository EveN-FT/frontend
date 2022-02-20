import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import eventImage from "../assets/placeholders/event-image.jpeg";
import EventABI from "../assets/EventABI.json";
import "../styles/explore.scss";
import api from "../api";

export type Event = {
  address: string;
  name: string;
  owner: string;
  metadata: string;
};

type EventDetail = {
  address: string;
  id: number;
  ownerAddress: string;
};

type EventContract = {
  name: string;
  owner: string;
  metadata: string;
};

const Explore = () => {
  const { library } = useWeb3React();
  const [events, setEvents] = useState<Event[]>([]);
  const [eventData, setEventData] = useState<EventDetail[]>([]);

  useEffect(() => {
    const apiCall = async () => {
      const { data } = await api.post("/event/list", {});
      setEventData(data.events);
    };
    apiCall();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const loadData = async () => {
      setEvents(
        await Promise.all(
          eventData.map(async (eventContract) => {
            const eventContractDetails: EventContract = await loadContract(
              eventContract.address
            );

            return {
              address: eventContract.address,
              name: eventContractDetails.name,
              owner: eventContractDetails.owner,
              metadata: eventContractDetails.metadata,
            };
          })
        )
      );
    };

    loadData();
    console.log(events);
  }, [eventData]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadContract = async (address: string): Promise<EventContract> => {
    console.log(address);
    const contract = new ethers.Contract(address, EventABI, library);
    const name = await contract.name();
    const owner = await contract.owner();
    const metadata = await contract.metadata();

    return {
      name: name,
      owner: owner,
      metadata: metadata,
    };
  };

  return (
    <>
      <NavBar />
      <main className="explore">
        {events.map((event) => {
          return (
            <Link to={`/event/${event.address}`}>
              <div className="event-hero">
                <div className="event-description">
                  <h1>{event.name}</h1>
                  <p className="description">{event.owner}</p>
                  <Link to={`/event/${event.address}/tickets`}>
                    <button>Buy Tickets</button>
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

export default Explore;
