import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/home.scss";
import ticketDesign from "../assets/03-ticketdesign.jpeg";

const EventDetails = () => {
    return (
        <>
            <NavBar />
            <main className="home">
                <div className="hero">
                    <div className="half">
                        <h1>
                            select ticket type
                        </h1>
                    </div>
                </div>
            </main>
        </>
    );
};

export default EventDetails;
