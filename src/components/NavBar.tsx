import ticketIcon from "../assets/ticket-icon.png";
import { Link } from "react-router-dom";
import WalletConnection from "./WalletConnection";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">
              <img src={ticketIcon} alt="Ticket icon" className="icon" />
            </Link>
          </li>
          <li>
            <WalletConnection />
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
