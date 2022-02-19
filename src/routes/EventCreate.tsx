import { useNavigate, Link } from "react-router-dom";
import { useState, FormEventHandler, useEffect } from "react";
import "../styles/event-create.scss";

import { getWeb3ReactContext, useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

const EventCreate = () => {
  const navigate = useNavigate();
  const [datetime, setDatetime] = useState(new Date().toISOString());

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [bc, setbc] = useState<string>();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    // ipfs upload

    // ipfs hash for metadata
  };

  useEffect(() => {
    async function getbytecode() {
      var bc = await provider.getCode(
        "0x537f2A1C7d368FbCAA8395614a482d9ACf4D9d0D"
      );
      setbc(bc);
    }
    getbytecode();
  }, []);

  return (
    <main className="create-event">
      <span className="close" onClick={() => navigate(-1)}></span>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Event Title"
          autoFocus
          maxLength={40}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Event Description"
          rows={4}
          maxLength={280}
        />
        <label htmlFor="venue">Venue</label>
        <input
          type="text"
          id="venue"
          name="venue"
          placeholder="Venue"
          maxLength={40}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          maxLength={40}
        />
        <label htmlFor="datetime">Date & Time</label>
        <input type="datetime-local" id="datetime" name="datetime" />
        <button type="submit">Create</button>
      </form>
    </main>
  );
};

export default EventCreate;
