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

  return (
    <>
      <NavBar />
      <main className="event-detail">
        <div>
          <h1 className="title">{metadata.name}</h1>
          <p className="description">{metadata.description}</p>
          {/* <p className="location">{metadata.attributes[]}</p> */}
        </div>
        <img src={metadata.image.url.ORIGINAL} alt="" />
      </main>
    </>
  );
};

export default EventDetail;
