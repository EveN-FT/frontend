import { useState } from "react";
import ConnectInjected from "./wallet/ConnectInjected";
import ConnectWalletConnect from "./wallet/ConnectWalletConnect";
import ConnectCoinbase from "./wallet/ConnectCoinbase";
// import Web3ReactConnectionComponent from "./wallet/Web3ReactConnectionComponent";
import WalletConnectInjectedProvider from "./WalletConnectInjectedProvider";

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
            <img src={ticketIcon} alt="Ticket icon" className="icon" />
          </li>
          <li>
            <button onClick={() => setOpenModal(true)}>Connect</button>
          </li>
          {/* <li> */}
          {/*   <Web3ReactConnectionComponent /> */}
          {/* </li> */}
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
