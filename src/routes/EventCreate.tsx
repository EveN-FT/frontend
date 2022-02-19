import { useNavigate, Link } from "react-router-dom";
import { useState, FormEventHandler, useEffect } from "react";
import { create, CID } from "ipfs-http-client";
import { getWeb3ReactContext, useWeb3React } from "@web3-react/core";
import { Contract, ethers } from "ethers";
import EventABI from "../assets/EventABI.json";

import "../styles/event-create.scss";

const EventCreate = () => {
  const [image, setImage] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [datetime, setDatetime] = useState(new Date().toISOString());

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const [bc, setbc] = useState<string>();
  // console.log(signer);
  // console.log(bc);

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
      name: title,
      description: description,
      attributes: [
        {
          key: "/venue",
          value: venue,
        },
        {
          key: "/city",
          value: city,
        },
        {
          key: "/time",
          value: datetime,
        },
      ],
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
    // this is for u @jay
    const metadataUri = `ipfs://ipfs/${metadataCid}`;
  };

  useEffect(() => {
    async function getbytecode() {
      var bc = await provider.getCode(
        "0x537f2A1C7d368FbCAA8395614a482d9ACf4D9d0D"
      );
      setbc(bc);
    }
    getbytecode();
  }, []);

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setImage(event.target.files);
  };

  useEffect(() => {
    async function getbytecode() {
      var bc = await provider.getCode(
        "0x537f2A1C7d368FbCAA8395614a482d9ACf4D9d0D"
      );
      setbc(bc);
    }
    getbytecode();
  }, []);

  useEffect(() => {
    async function deployEvent() {
      console.log(signer);
      var res = await event.deploy(
        //!  this doesn't work
        signer._address,
        "from browser",
        "me ta da ta"
      );
      console.log(res);
    }
    if (bc) {
      const iface = new ethers.utils.Interface(EventABI);
      var event = new ethers.ContractFactory(iface, bc, signer);

      deployEvent();
    }
  }, [bc]);

  return (
    <main className="create-event">
      <span className="close" onClick={() => navigate(-1)}></span>
      <h1>Create</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Event Title"
          autoFocus
          maxLength={40}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Event Description"
          rows={4}
          maxLength={280}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="venue">Venue</label>
        <input
          type="text"
          id="venue"
          name="venue"
          placeholder="Venue"
          maxLength={40}
          onChange={(e) => setVenue(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          maxLength={40}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="datetime">Date & Time</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          onChange={(e) => setDatetime(e.target.value)}
        />
        <label htmlFor="image" className="label-show">
          Event Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          maxLength={40}
          accept=".png,.jpg,.jpeg"
          title="Upload event image"
          onChange={onImageChange}
        />
        <button type="submit">Create</button>
      </form>
    </main>
  );
};

export default EventCreate;
