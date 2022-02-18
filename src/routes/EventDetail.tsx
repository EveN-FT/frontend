import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { AbiItem } from "web3-utils";

import NavBar from "../components/NavBar";

import { fetcher } from "../utils/fetcher";
import eventAbi from "../utils/event.json";
import "../styles/explore.scss";

export type Event = {
  address: string;
  name: string;
  owner: string;
  metadata: string;
};

const EventDetail = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { eventAddress } = useParams();
  // const contract = new web3.eth.Contract(eventAbi as AbiItem[], eventAddress);
  // const [event, setEvent] = useState<Event>();

  const { data: name } = useSWR([eventAddress, "name", "latest"], {
    fetcher: fetcher(library),
  });

  useEffect(() => {
    console.log(library);
    //   let call = async () => {
    //     setEvent({
    //       address: eventAddress!,
    //       name: await contract.methods.name.call(),
    //       owner: await contract.methods.owner.call(),
    //       metadata: await contract.methods.metadata.call(),
    //     });
    //   };
    //   call();
  }, [library]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <NavBar />
      <main className="explore">{name && <h1>{name.toString()}</h1>}</main>
    </>
  );
};

export default EventDetail;
