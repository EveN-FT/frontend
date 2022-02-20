import api from "../api";
import { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";
import { ViewFinder } from "./ViewFinder";
import { ethers } from "ethers";
import abi from "../assets/TicketABI.json";
import { useWeb3React } from "@web3-react/core";
import { useParams } from "react-router-dom";

const Redeem = () => {
  const { library } = useWeb3React();
  const { address } = useParams();
  const [data, setData] = useState("Hold QR Code Steady and Clear to Scan");
  const [redeemed, setRedeemed] = useState(false);
  const [valid, setValid] = useState(Boolean);
  const args = {
    ViewFinder,
    videoId: "video",
    scanDelay: 500,
    constraints: {
      facingMode: "rear",
    },
  };

  var contract = new ethers.Contract(
    process.env.REACT_APP_TICKET_ADDRESS!,
    abi,
    library
  );

  const verify = async () => {
    const qrInfo = JSON.parse(data);
    const verified = ethers.utils.verifyTypedData(
      qrInfo.domain,
      qrInfo.types,
      qrInfo.value,
      qrInfo.signedMessage
    );
    const owner = await contract.ownerOf(qrInfo.value.ID);
    // // get owneraddres qrInfo.value.ID ownerOf(tokenId)
    if (verified === owner) {
      console.log("verified");
      return true;
    }
    return false;
  };

  useEffect(() => {
    const redeemTicket = async () => {
      try {
        const valid = await verify();
        setValid(valid);
        if (valid) {
          const qrInfo = JSON.parse(data);
          const res = await api.post("/ticket/redeem", {
            address: qrInfo.value.Owner,
            ticketId: parseInt(qrInfo.value.ID),
          });
          if (res.status === 200) {
            setRedeemed(true);
          }
        }
      } catch (e: any) {
        console.log(`error redeeming: ${e}`);
        setRedeemed(true);
        setValid(false);
      }
    };
    redeemTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const styles = {
    container: {
      width: "400px",
      margin: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <QrReader
        {...args}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      {valid && redeemed && <p>Ticket Redeemed</p>}
      {!valid && redeemed && <p>Invalid Ticket</p>}
      {!valid && !redeemed && <p>Scanning Ticket...</p>}
    </div>
  );
};

export default Redeem;
