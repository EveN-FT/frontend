import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import axios from "axios";
import useConnector from "../hooks/useConnector";

import NavBar from "../components/NavBar";
import { Event } from "./Explore";

import EventABI from "../assets/EventABI.json";
import "../styles/event-detail.scss";

const EventDetail = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const { library } = useWeb3React();
  const { isActive: active } = useConnector();
  const { address } = useParams();

  useEffect(() => {
    const apiCall = async () => {
      setEvent((await loadContract(address!))!);
    };
    apiCall();
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadContract = async (address: string): Promise<Event | null> => {
    try {
      const contract = new ethers.Contract(address, EventABI, library);
      const name = await contract.name();
      const owner = await contract.owner();
      const metadata = await contract.metadata();
      var metadataUri = metadata;

      if (metadata.startsWith("ipfs://")) {
        metadataUri = `https://ipfs.io/ipfs/${metadata.split("/").pop()}`;
      }

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
      console.log(error);
      return null;
    }
  };

  return (
    <>
      <NavBar />
      <main className="event-detail">
        {event === null ? (
          <p>Loading event data...</p>
        ) : (
          <>
            <div>
              <h1 className="title">{event.name}</h1>
              <p className="description">{event.description}</p>
              <table>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <td>{event.time}</td>
                  </tr>
                  <tr>
                    <th>Venue</th>
                    <td>{event.venue}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{event.city}</td>
                  </tr>
                </tbody>
              </table>
              <Link to={`/event/${address}/tickets`}>
                <button>Buy Tickets</button>
              </Link>
            </div>
            <img src={event.imageUrl} alt={event.name} />
          </>
        )}
      </main>
    </>
  );
};

export default EventDetail;
