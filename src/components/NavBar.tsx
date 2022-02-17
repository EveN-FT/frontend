import { useState } from "react";
import ticketIcon from "../assets/ticket-icon.png";
import { Link } from "react-router-dom";
import Home from "../routes/Home";
import WalletConnection from "./WalletConnection";
import "../styles/navbar.scss";
import "../styles/wallet-modal.scss";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <ul>
          <li>
            <div onClick={() => console.log('route to Home')}>
              <img src={ticketIcon} alt="Ticket icon" className="icon" />
            </div>
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
