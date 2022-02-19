import { Link } from "react-router-dom";
import "../styles/home.scss";
import axios from "axios";
import { useEffect, useState } from "react";


const EventView = () => {
    const [contracts, setContracts] = useState([]);

    const COVALENT_API_BASE = `https://api.covalenthq.com/v1`
    // useEffect(() => {
    //     axios.get(COVALENT_API_BASE).then(({ data }) => {
    //         setContracts(data);
    //     }).catch(console.error)
    // }, []);
    
    
    const [selectedContract, setSelectedContract] = useState('');

    // const userSelect: any () => {
    //     setSelectedContract
    // }





    //use WalletBalanceItem ?

    let contractsTest = [{
        contract_decimals: 18,
        contract_name: "TED Talk",
        contract_ticker_symbol: "TEDX",
        contract_address: 0xddd1d123e53a1acf61a47ba592e62b240199b1a6,
        supports_erc: ['ERC-20'],
        logo_url: "",
    },
    {
        contract_decimals: 18,
        contract_name: "Tiesto at Temple",
        contract_ticker_symbol: "TIESTO",
        contract_address: 0xddd1d123e53a1acf61a47ba592e62b240199b1a6,
        supports_erc: ['ERC-20'],
        logo_url: "",
    }
    ]


    return (
        <>
            <main className="home">
                <div className="hero">
                    <h1>
                        NFTs displayed here  -  Covalent
                    </h1>
                </div>
            </main>
        </>
    );
};

export default EventView;