import React, { useEffect, useState } from 'react';
import { Box, IconButton, Tab, Tabs } from '@material-ui/core';
import { Link } from 'react-router-dom';
import WalletConnect from './WalletConnect';
// import WalletConnect2 from './wallet/WalletConnect2';
import Logo from '../images/Logo.ico';


const TabBar = () => {

  const [activeTab, setActiveTab] = useState('/');

  useEffect(() => {
    const route = window?.location?.pathname;
    switch(route) {
      case '/explore':
        return setActiveTab('/explore');
      default:
        return 0;
    }
  }, [])


  const onTabChange = (event, newValue) => {
    setActiveTab(newValue);
  }
  

  return (
    <Box style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '50px'
    }}>
      <Tabs 
        value={activeTab} 
        onChange={onTabChange}
      >
        <IconButton value="/" component={Link} to={'/'} style={{margin: "0px 0px 0px 60px", height:'40px'}} size="medium"><img height={40} src={Logo}/></IconButton>
        <Tab label="Home" value="/" component={Link} to={'/'}/>
        <Tab label="Explore" value="/explore" component={Link} to={'/explore'} />
      </Tabs>
      <Box style={{ marginRight: 60 }}>
        <WalletConnect />
      </Box>
    </Box>
  );
}

export default TabBar;