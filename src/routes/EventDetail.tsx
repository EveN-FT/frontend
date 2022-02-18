import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import { events } from "./Explore";

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
        <h1 className="title">{events[0].name}</h1>
        <p className="description">Event Title</p>
      </main>
    </>
  );
};

export default EventDetail;
