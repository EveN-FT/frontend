import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/wallet.scss";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
    const COVALENT_API_BASE = `https://api.covalenthq.com/v1`
    const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY!
    const CHAIN_ID = 1
    const { active, account, activate, deactivate } = useWeb3React()

    //COVALENT API CALL get all tokens belonging to signed in wallet
    console.log('User logged in as ',account)
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        const COVALENT_GET_TOKENS = `${COVALENT_API_BASE}/${CHAIN_ID}/${account}/balances_v2/?quote-currency=USD&format=JSON&nft=true&no-nft-fetch=false&key=${process.env.REACT_APP_COVALENT_KEY}`
        axios.get(COVALENT_GET_TOKENS).then(({ data }) => {
            setTokens(data);
            console.log('api return',data)
        }).catch(console.error)
    }, []);


    //TODO add logout option here with 'deactive' so it can be removed from navbar's walletconnection component
    //TODO filter tokens for just ours, then map
    //TODO link to event detail page for each token when selected

  return (
    <>
      <NavBar />
      <main className="wallet">
        <div className="hero">
          <div className="half">
            <h1>your tickers here</h1>
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
