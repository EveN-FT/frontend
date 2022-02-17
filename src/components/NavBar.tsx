import { useState } from "react";
import { Link } from "react-router-dom";
import ConnectInjected from "./wallet/ConnectInjected";
import ConnectWalletConnect from "./wallet/ConnectWalletConnect";
import ConnectCoinbase from "./wallet/ConnectCoinbase";
import ticketIcon from "../assets/ticket-icon.png";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";

const NavBar = () => {
  const [openModal, setOpenModal] = useState(false);

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
            <button onClick={() => setOpenModal(true)}>Connect</button>
          </li>
        </ul>
      </div>
      {openModal && (
        <div className="wallet-modal" onClick={() => setOpenModal(false)}>
          <div className="close" onClick={() => setOpenModal(false)}></div>
          <div className="button-grid">
            <ConnectInjected />
            <ConnectWalletConnect />
            <ConnectCoinbase />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
