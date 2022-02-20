import { useState } from 'react';
import {TextField, TextareaAutosize, Grid} from '@material-ui/core'
import QRcode from 'qrcode.react';
import { useWeb3React } from '@web3-react/core';

const UserRedeem = () => {
  const [qr, setQr] = useState('Tiny Tix');
  const handleChange = (event:any) => {
    setQr(event.target.value);
  };
  const { account, library, chainId } = useWeb3React();
  // const [signedMessage, setSignedMessage] = useState("");

  const sign = async () => {
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

    // The data to sign
    const value = {
      Event: {
        Name: "Kanye West",
        Address: "0xdcef22fFa720E446fe4EEB1656506B1bB650b343",
      },
      Owner: account,
      ID: 5,
    };
    const signer = await library.getSigner();
    const signedMessage = await signer._signTypedData(domain, types, value);
    setQr(JSON.stringify({
      "domain": domain,
      "types": types,
      "value": value,
      "signedMessage": signedMessage
    }))
  };

  return (
    <div>
      <span>QR Generator</span>
          <div style={{marginTop:30}}>
            <TextField onChange={handleChange} style={{width:320}}
              value={qr} label="Input here to create QR" size="medium" variant="outlined" color="primary"
             />
          </div>
          <div>
            {
              qr ?
                <QRcode
                  id="myqr"
                  value={qr}
                  size={320}
                  includeMargin={true}
                /> :
                <p>No QR code preview</p>
            }
          </div>
          <div>
            {
              qr ?
                <Grid container>
                  <Grid item xs={10}>
                  <TextareaAutosize
                    style={{fontSize:18, width:250, height:100}}
                    rowsMax={4}
                    defaultValue={qr}
                    value={qr}
                  />
                  </Grid>
                </Grid> : ''
              }
            </div>
            <button onClick={sign}>Sign</button>
            {/* <button onClick={verify}>Verify</button> */}
      </div>

  );
};

export default UserRedeem;
