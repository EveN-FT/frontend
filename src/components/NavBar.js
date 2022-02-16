import WalletConnect from "./WalletConnect";
import "../styles/navbar.scss";
import ticketIcon from "../assets/ticket-icon.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <img src={ticketIcon} alt="Ticket icon" className="icon" />
        </li>
        <li>
          <WalletConnect />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
