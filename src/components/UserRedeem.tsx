import { useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";
import QRcode from "qrcode.react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import TicketABI from "../assets/TicketABI.json";
import EventABI from "../assets/EventABI.json";
import "../styles/qr.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRedeem = () => {
  const { id: ticketId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qr, setQr] = useState("");
  const handleChange = (event: any) => {
    setQr(event.target.value);
  };
  const { account, library, chainId } = useWeb3React();
  var ticketContract = new ethers.Contract(
    process.env.REACT_APP_TICKET_ADDRESS!,
    TicketABI,
    library
  );

  const sign = async () => {
    console.log(ticketId);
    const domain = {
      name: "Tiny Tix",
      version: "1",
      chainId: chainId,
      verifyingContract: process.env.REACT_APP_TICKET_ADDRESS!,
    };

    // The named list of all type definitions
    const types = {
      Event: [
        { name: "Name", type: "string" },
        { name: "Address", type: "address" },
      ],
      Ticket: [
        { name: "Event", type: "Event" },
        { name: "Owner", type: "address" },
        { name: "ID", type: "uint256" },
      ],
    };
    const owner = await ticketContract.ownerOf(ticketId);
    // need to be the owner of the ticket
    if (owner !== account) {
      console.log("not owner");
      return;
    }
    const eventAddress = await ticketContract.eventAddress(ticketId);
    const eventContract = new ethers.Contract(eventAddress, EventABI, library);
    const eventName = await eventContract.name();

    // NEED to get the data to sign
    const value = {
      Event: {
        Name: eventName,
        Address: eventAddress,
      },
      Owner: account,
      ID: ticketId,
    };
    const signer = await library.getSigner();
    const signedMessage = await signer._signTypedData(domain, types, value);
    setQr(
      JSON.stringify({
        domain: domain,
        types: types,
        value: value,
        signedMessage: signedMessage,
      })
    );
  };

  return (
    <>
      <main className="qr">
        <span className="close" onClick={() => navigate(-1)}></span>
        <div>
          <div>
            {qr ? (
              <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
            ) : (
              <button onClick={sign}>Click to redeem</button>
            )}
          </div>
          {/* <button onClick={verify}>Verify</button> */}
        </div>
      </main>
    </>
  );
};

export default UserRedeem;
