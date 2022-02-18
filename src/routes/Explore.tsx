import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Event } from "./EventDetail";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/explore.scss";

const events: Event[] = [
  {
    title: "Deadmau5",
    description:
      "Deadmau5 is playing his 4 millionth show at the Temple Theater in downtown Denver. Wednesday, February 16th from 5:00pm - 2:00am",
    imageUrl: "https://",
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
  },
  {
    title: "Chainlink Happy Hour",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    imageUrl: "https://",
    address: "0x37121F74d25262011AdD8cc8D13E6923AEb699d8",
  },
];

const Explore = () => {
  return (
    <>
      <NavBar />
      <main className="explore">
        {events.map((event) => {
          return (
            <div className="event-hero">
              <div className="event-description">
                <h1>{event.title}</h1>
                <p className="description">{event.description}</p>
                <Link to={`/event/${event.address}`}>
                  <button>Buy Tickets</button>
                </Link>
              </div>
              <div className="event-media">
                <img src={eventImage} alt={event.title} />
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Explore;
