import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";

import eventImage from "../assets/placeholders/event-image.jpeg";
import "../styles/explore.scss";

export type Event = {
  title: string;
  description: string;
  imageUrl: string;
  address: string;
};

const Explore = () => {
  let { eventAddress } = useParams();

  return (
    <>
      <NavBar />
      <main className="explore">
        <p>{eventAddress}</p>
      </main>
    </>
  );
};

export default Explore;
