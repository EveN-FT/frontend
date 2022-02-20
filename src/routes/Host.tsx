import { Link } from "react-router-dom";
import { ethers } from "ethers";
import NavBar from "../components/NavBar";
import { Event } from "./Explore";
import { tickets } from "./EventMint";
import { EventDetail } from "./Explore";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/host.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api";
import { useWeb3React } from "@web3-react/core";
import EventABI from "../assets/EventABI.json";

const Host = () => {
  const { library } = useWeb3React();
  const [events, setEvents] = useState<(Event | null)[]>([]);
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
            const event: Event | null = await loadContract(
              eventContract.address
            );

            return event;
          })
        )
      );
    };

    loadData();
  }, [eventData]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadContract = async (address: string): Promise<Event | null> => {
    const contract = new ethers.Contract(address, EventABI, library);
    const name = await contract.name();
    const owner = await contract.owner();
    const metadata = await contract.metadata();
    var metadataUri = metadata;

    if (metadata.startsWith("ipfs://")) {
      metadataUri = `https://ipfs.io/ipfs/${metadata.split("/").pop()}`;
    }

    try {
      const { data } = await axios.get(metadataUri);
      var imageUri = data.image.url.ORIGINAL;

      if (imageUri.startsWith("ipfs://")) {
        imageUri = `https://ipfs.io/ipfs/${imageUri.split("/").pop()}`;
      }

      const description = data.description;
      const attributes = data.attributes;
      const venue = attributes.find(
        (element: { key: string; value: string }) => element.key === "/venue"
      ).value;
      const city = attributes.find(
        (element: { key: string; value: string }) => element.key === "/city"
      ).value;
      const time = attributes.find(
        (element: { key: string; value: string }) => element.key === "/time"
      ).value;

      return {
        address: address,
        name: name,
        description: description,
        owner: owner,
        metadata: metadata,
        imageUrl: imageUri,
        venue: venue,
        city: city,
        time: time,
      };
    } catch (error) {
      return null;
    }
  };
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
        {events.length < 1 ? (
          <p>Loading events...</p>
        ) : (
          events
            .filter((event) => event !== null)
            .map((event, key) => {
              return (
                <Link to={`/event/${event!.address}`} key={key}>
                  <div className="event-hero">
                    <div className="event-description">
                      <h1>{event!.name}</h1>
                      <p className="description">{event!.description}</p>
                      <Link to={`/event/${event!.address}/mint`}>
                        <button>Mint Tickets</button>
                      </Link>
                    </div>
                    <div className="event-media">
                      <img src={event!.imageUrl} alt={event!.name} />
                    </div>
                  </div>
                </Link>
              );
            })
        )}
      </main>
    </>
  );
};

export default Host;
