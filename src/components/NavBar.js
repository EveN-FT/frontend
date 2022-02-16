import WalletConnect from "./WalletConnect";
import "../styles/navbar.scss";
import ticketIcon from "../assets/ticket-icon.png";
import Web3ReactConnectionComponent from "./wallet/Web3ReactConnectionComponent";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <img src={ticketIcon} alt="Ticket icon" className="icon" />
        </li>
        {/* <li>
          <WalletConnect />
        </li> */}
        <li>
          <Web3ReactConnectionComponent />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
