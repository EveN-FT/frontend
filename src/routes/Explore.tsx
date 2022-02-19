import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Event } from "./EventDetail";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/explore.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const events: Event[] = [
  {
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
    name: "Deadmau5",
    owner:
      "Deadmau5 is playing his 4 millionth show at the Temple Theater in downtown Denver. Wednesday, February 16th from 5:00pm - 2:00am",
    metadata: "",
  },
  {
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
    name: "Chainlink Happy Hour",
    owner:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    metadata: "",
  },
];


// type Event2 = {
//     contract_decimals: number;
//     contract_name: string;
//     contract_ticker_symbol: string;
//     contract_address: string;
//     supports_erc: Array<string>
//     logo_url: string;
//     type: string;
//     nft_data: Array<Object>;
//   }
type EventGo = {
  address: string;
  ownerAddress: string;
  id: number;
}
type EventWithContractData = {
  address: string;
  ownerAddress: string;
  id: number;
  name: string;
  description: string;
  metadata: string;
}

const Explore = () => {
  // const COVALENT_API_BASE = `https://api.covalenthq.com/v1`
  // const CHAIN_ID = 1 //1: ETH Mainnet 137: Polygon Mainnet
  // const testAddr = '0xDDd1d123e53a1aCf61A47ba592E62B240199B1a6' //erc721 for rando nft collection
  // const [contracts, setContracts] = useState<Contract[]>([]);
  // useEffect(() => {
  //   const COVALENT_CONTRACT_DETAILS = `${COVALENT_API_BASE}/${CHAIN_ID}/tokens/${testAddr}/nft_metadata/123/?&key=${process.env.REACT_APP_COVALENT_KEY}`
  //   axios.get(COVALENT_CONTRACT_DETAILS).then(({ data }) => {
  //     setContracts(data.data.items);
  //     // console.log('api return', data.data.items)
  //   }).catch(console.error)
  // }, []);
  const [eventsGo, setEventsGo] = useState<EventGo[]>([]);
  useEffect(() => {
    const ListEvents = 'https://beta-even-ft-backend.onrender.com/api/v1/event/list'
    axios.post(ListEvents).then(({ data }) => {
      setEventsGo(data);
      console.log('explore backend api return', data)
    }).catch(console.error)
  }, []);

  const [eventsData, setEventsData] = useState<EventWithContractData[]>([]);
  // useEffect(() => {
    
  //   // axios.post(web2).then(({ data }) => {



  //     // setEventsData(data);
  //     // console.log('explore backend api return', data)
  //   }).catch(console.error)
  // }, []);

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
        {/* {eventsGo.map((event) => {
          return (
            <Link to={`/event/${event.address}`}>
              <div className="event-hero">
                <div className="event-description">
                  <h1>{event.address}</h1>
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
        })} */}

      </main>
    </>
  );
};

export default Explore;
