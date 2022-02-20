import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useWeb3React } from "@web3-react/core";
import "../styles/explore.scss";
import { Event } from "../routes/Explore";
import { useNFTBalances } from "react-moralis";

export type Ticket = {
  eventAddress?: string;
  owner: string;
  tokenUri: string;
  id: number;
  event?: Event;
  type?: string;
  description?: string;
  image?: string;
};

export type TicketMetadata = {
  id: string;
  description: string;
  image: any;
  name: string;
  eventAddress: string;
};

const UserTickets = () => {
  const { account, chainId } = useWeb3React();
  const [tickets, setTickets] = useState<TicketMetadata[]>([]);
  const { getNFTBalances } = useNFTBalances();

  // const testAddr = "0x67Fd888Da2319f8f8419FD7842e32d5C5E71F528";
  useEffect(() => {
    const load = async () => {
      if (account && chainId) {
        const balance = await getNFTBalances({
          params: {
            address: account,
            chain: "rinkeby",
            token_addresses: [process.env.REACT_APP_TICKET_ADDRESS!],
          },
        });
        if (balance) {
          setTickets(
            balance
              .result!.filter((token) => token.metadata)
              .map((token) => {
                const metadata = JSON.parse(token.metadata!);
                return {
                  id: token.token_id,
                  name: metadata.name,
                  image: metadata.image.url.ORIGINAL,
                  description: metadata.description,
                  eventAddress: metadata.eventAddress,
                };
              })
          );
        }
      }
    };
    load();
  }, [account]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      <main className="explore">
        {tickets &&
          tickets.map((ticket, key) => {
            var imgUri = ticket.image;

            if (ticket.image.startsWith("ipfs://")) {
              imgUri = `https://ipfs.io/ipfs/${ticket.image.split("/").pop()}`;
            }

            return (
              <React.Fragment key={key}>
                <div className="event-hero">
                  <Link to={`/event/${ticket.eventAddress}`} key={key}>
                    <div className="event-description">
                      <h1>{ticket.name}</h1>
                      <p className="description">{ticket.description}</p>
                      <Link to={`/user/redeem/${ticket.id}`}>
                        <button>Redeem Ticket</button>
                      </Link>
                    </div>
                  </Link>
                  <div className="event-media">
                    <img src={imgUri} alt={ticket.name} />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
      </main>
    </>
  );
};

export default UserTickets;
