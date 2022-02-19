import api from '../api'
import { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { ViewFinder } from './ViewFinder';

const Redeem = () => {
  const [data, setData] = useState('Hold QR Code Steady and Clear to Scan');
  const [valid, setValidTicket] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const args = {
    ViewFinder,
    videoId: 'video',
    scanDelay: 500,
    constraints: {
      facingMode: 'user',
    },
  };
  // qr data needs to be in {"owner: "0x2...", "ticketId": 1, "contractAddress": "0xde..." "}

  useEffect(() => {
    const redeemTicket = async () => {
      try {
        if (valid) {
          const res = await api.post('/ticket/redeem', {
            address: JSON.parse(data).owner,
            ticketId: JSON.parse(data).ticketId,
          })
          if (res.status === 200) {
            setRedeemed(true)
          }
        }
      } catch (e: any) {
        console.log(`error redeeming: ${e}`)
      }
    }
    redeemTicket()
    setValidTicket(false)
  }, [data, valid])

  const styles = {
    container: {
      width: '400px',
      margin: 'auto',
    },
  };
  return (
    <div style={styles.container}>
      <QrReader
      {...args}
        onResult={(result, error) => {
          if (!!result) {
            setData(result.getText())
            setValidTicket(true)
          }

          if (!!error) {
            console.info(error);
          }
        }}
      />
      <p>{data}</p>
      {redeemed ? <p>Ticket Redeemed</p> : <p>Waiting on ticket</p>}
    </div>
  );
};

export default Redeem;
