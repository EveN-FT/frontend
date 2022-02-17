import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/home.scss";
import ticketDesign from "../assets/03-ticketdesign.jpeg";

const Home = () => {
  return (
    <>
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
        <Link to="/explore">
          <button>Explore Tickets →</button>
        </Link>
      </main>
    </>
  );
};

export default Home;
