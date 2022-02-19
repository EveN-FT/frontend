import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import { events } from "./Explore";

import metadata from "../assets/placeholders/metadata.json";
import "../styles/event-detail.scss";

export type Event = {
  address: string;
  name: string;
  owner: string;
  metadata: string;
};

const EventDetail = () => {
  const { address } = useParams();

  useEffect(() => {
    console.log(address);
  }, [address]);
  console.log();

  return (
    <>
      <NavBar />
      <main className="event-detail">
        <div>
          <h1 className="title">{metadata.name}</h1>
          <p className="description">{metadata.description}</p>
          {/* <p className="location">{metadata.attributes[]}</p> */}
          <table>
            <tr>
              <th>Date</th>
              <td>
                {
                  metadata.attributes.find((element) => element.key === "/time")
                    ?.value
                }
              </td>
            </tr>
            <tr>
              <th>Venue</th>
              <td>
                {
                  metadata.attributes.find(
                    (element) => element.key === "/venue"
                  )?.value
                }
              </td>
            </tr>
            <tr>
              <th>City</th>
              <td>
                {
                  metadata.attributes.find((element) => element.key === "/city")
                    ?.value
                }
              </td>
            </tr>
          </table>
          <button>Buy Tickets</button>
        </div>
        <img src={metadata.image.url.ORIGINAL} alt="" />
      </main>
    </>
  );
};

export default EventDetail;
