import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

import ticketDesign from "../assets/03-ticketdesign.jpeg";
import background from "../assets/background.svg";
import "../styles/home.scss";

const Home = () => {
  return (
    <>
      {/* <img className="background" src={background} alt="" /> */}
      <NavBar />
      <main className="home">
        <div className="hero">
          <div className="half">
            <h1>
              Tickets
              <br />
              on the
              <br />
              Blockchain
            </h1>
            <img src={ticketDesign} alt="Ticket design" />
          </div>
        </div>
        <div className="home__cta">
          <Link to="/host">
            <button>Host events →</button>
          </Link>
          <Link to="/explore">
            <button>Get your tickets →</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
