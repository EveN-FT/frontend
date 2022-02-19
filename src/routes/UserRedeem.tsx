import { useState } from 'react';
import {TextField, TextareaAutosize, Grid} from '@material-ui/core'
import QRcode from 'qrcode.react';

const UserRedeem = () => {
  const [qr, setQr] = useState('Tiny Tix');
  const handleChange = (event:any) => {
    setQr(event.target.value);
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
      </div>

  );
};

export default UserRedeem;
