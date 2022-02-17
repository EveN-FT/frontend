import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/home.scss";

const Explore = () => {
  return (
    <>
      <NavBar />
      <main className="home">
        <div className="hero">
          <h1>
            Events Happening Soon
          </h1>
        </div>
      </main>
    </>
  );
};

export default Explore;