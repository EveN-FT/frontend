import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/wallet.scss";
import ticketDesign from "../assets/03-ticketdesign.jpeg";

const Wallet = () => {

    //COVALENT API CALL get all tokens belonging to signed in wallet
    const userTickers = [
        {
          title: "Deadmau5",
          description:
            "Deadmau5 is playing his 4 millionth show at the Temple Theater in downtown Denver. Wednesday, February 16th from 5:00pm - 2:00am",
          imageUrl: "https://",
          contractId: "0xddd1d123e53a1acf61a47ba592e62b240199b1a6",
        },
        {
          title: "Chainlink Happy Hour",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          imageUrl: "https://",
          contractId: "0xddd1d123e53a1acf61a47ba592e62b240199b1a6",
        },
      ];


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
