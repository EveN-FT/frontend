import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { create, CID } from "ipfs-http-client";
import TicketABI from "../assets/TicketABI.json";

import "../styles/mint-tickets.scss";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

export const tickets = [
  {
    type: "General Admission",
    price: 15.0,
    amountRemaining: 0,
  },
  {
    type: "General Admission 2",
    price: 17.0,
    amountRemaining: 150,
  },
  {
    type: "VIP",
    price: 35.0,
    amountRemaining: 30,
  },
  {
    type: "Backstage Pass",
    price: 150.0,
    amountRemaining: 3,
  },
];

const EventMint = () => {
  const { address: eventAddress } = useParams();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const { library } = useWeb3React();

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setImage(event.target.files);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    // ipfs upload
    if (image === null) {
      // handle no image here
      console.log("no image");
      return;
    }

    // Read the file uploaded to get image dimensions and type
    var imageData = new Image();
    var imageType = "";
    var fileReader = new FileReader();

    fileReader.onload = async () => {
      imageData.src = fileReader.result as string;

      async function getImageBlob(imageUrl: string) {
        const response = await fetch(imageUrl);
        return response.blob();
      }

      const imageBlob = await getImageBlob(fileReader.result as string);
      imageType = imageBlob.type;
    };
    fileReader.readAsDataURL(image[0]);

    const client = create({ url: "https://ipfs.infura.io:5001" });
    const { cid: imageCid } = await client.add(image![0]);

    // ipfs hash for metadata
    const metadata = {
      name: type,
      description: desc,
      eventAddress: eventAddress,
      image: {
        url: {
          ORIGINAL: `ipfs://ipfs/${imageCid}`,
        },
        meta: {
          ORIGINAL: {
            type: imageType,
            width: imageData.width,
            height: imageData.height,
          },
        },
      },
    };

    const { cid: metadataCid } = await client.add(JSON.stringify(metadata));
    const metadataUri = `ipfs://ipfs/${metadataCid}`;

    async function mintTickets() {
      const loadContract = async () => {
        var addr = await library.getSigner().getAddress();
        const contractShape = new ethers.Contract(
          process.env.REACT_APP_TICKET_ADDRESS!,
          TicketABI,
          library
        );
        var contract = contractShape.connect(library.getSigner());
        console.log(contract);
        var res = await contract.mint(
          eventAddress,
          metadataUri,
          parseInt(amount),
          parseInt(price)
        );
        var { events } = await res.wait();
        var ids = [];

        for (var i = 0; i < events.length; i++) {
          ids.push(events[i].args.tokenId.toNumber());
        }
        console.log(ids);
        await axios.post(
          "https://beta-even-ft-backend.onrender.com/api/v1/ticket/create",
          { address: addr, ticketIds: ids }
        );
      };
      await loadContract();
    }
    mintTickets();
  };

  return (
    <main className="mint-tickets">
      <span className="close" onClick={() => navigate(-1)}></span>
      <h1>Mint Tickets</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type</label>
        <input
          type="text"
          id="type"
          name="type"
          placeholder="Ticket Type"
          autoFocus
          maxLength={40}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="description">Ticket Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Ticket Description"
          rows={3}
          maxLength={140}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label htmlFor="amount">Ticket Amount</label>
        <textarea
          id="amount"
          name="amount"
          placeholder="Amount of tickets"
          rows={1}
          maxLength={3}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="price">Price in Gwei</label>
        <textarea
          id="price"
          name="price"
          placeholder="Ticket price in gwei"
          rows={1}
          maxLength={24}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="image" className="label-show">
          Ticket Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          maxLength={40}
          accept=".png,.jpg,.jpeg"
          title="Upload ticket image"
          onChange={onImageChange}
        />
        <button type="submit">Mint</button>
      </form>
    </main>
  );
};

export default EventMint;
