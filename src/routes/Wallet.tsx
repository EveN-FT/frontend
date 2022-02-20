import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/wallet.scss";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  type NftExternalData = {
    name: string;
    description: string;
    image: string;
    image_256: string;
    image_512: string;
    image_1024: string;
    animation_url: string;
    external_url: string;
    attributes: Array<Object>;
    owner: string;
  };
  type NftData = {
    token_id: number;
    token_balance: number;
    token_url: string;
    supports_erc: Array<string>;
    token_price_wei: number;
    token_quote_rate_eth: number;
    original_owner: string;
    external_data: NftExternalData;
    owner: string;
    owner_address: string;
    burned: string;
  };
  type Token = {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    supports_erc: Array<string>;
    logo_url: string;
    last_transferred_at: string;
    type: string;
    balance: string;
    balance_24h: string;
    quote_rate: number;
    quote_rate_24h: number;
    quote: number;
    quote_24h: number;
    nft_data: Array<NftData>;
  };
  const COVALENT_API_BASE = `https://api.covalenthq.com/v1`;
  const CHAIN_ID = 1; //1: ETH Mainnet 137: Polygon Mainnet
  const { active, account, activate, deactivate } = useWeb3React();
  let navigate = useNavigate();

  const testAddr = "0x67Fd888Da2319f8f8419FD7842e32d5C5E71F528";

  const [tokens, setTokens] = useState<Token[]>([]);
  useEffect(() => {
    const COVALENT_GET_WALLET_BALANCE = `${COVALENT_API_BASE}/${CHAIN_ID}/address/${account}/balances_v2/?&quote-currency=USD&nft=true&key=${process.env.REACT_APP_COVALENT_KEY}`;
    //this is for testing, above is the real api URL
    // const COVALENT_GET_WALLET_BALANCE = `${COVALENT_API_BASE}/${CHAIN_ID}/address/${testAddr}/balances_v2/?&quote-currency=USD&nft=true&key=${process.env.REACT_APP_COVALENT_KEY}`
    axios
      .get(COVALENT_GET_WALLET_BALANCE)
      .then(({ data }) => {
        setTokens(data.data.items);
        // console.log('api return', data.data.items)
      })
      .catch(console.error);
  }, []);
  const NftTokens = tokens.filter(
    (token) => token.nft_data !== null && token.nft_data.length !== 0
  );
  if (NftTokens.length === 0) {
    return (
      <>
        <NavBar />
        <main className="wallet">
          <div className="hero">
            <div className="half">
              It looks like you don't have any Tiny Tix tickets yet!
              <br></br>
              Make sure you're signed in with the correct wallet to see your
              previously purchased tickets.
              <br></br>
              Or go find some Tix for your favorite event on our
              <Link to="/explore">
                <button>Explore page</button>
              </Link>
            </div>
          </div>
          <button
            className="red"
            onClick={() => {
              deactivate();
              navigate("/");
            }}
          >
            Disconnect
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="wallet">
        <div className="hero">
          <div className="half">
            {NftTokens.map((nft) => {
              // console.log('each here ', nft.nft_data[0].external_data.external_url)
              return (
                <Link to={`/event/${nft.nft_data[0].original_owner}`}>
                  <div>
                    <div>
                      <h2>{nft.contract_name}</h2>
                    </div>
                    <div>{nft.nft_data[0].external_data.name}</div>
                    <div>
                      {/* <img src={nft.logo_url}  alt={nft.contract_name}/> */}
                    </div>
                    <div>{nft.nft_data[0].external_data.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Wallet;
