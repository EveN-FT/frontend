import { useNavigate, Link } from "react-router-dom";
import { useState, FormEventHandler, useEffect } from "react";
import { create, CID } from "ipfs-http-client";
import { getWeb3ReactContext, useWeb3React } from "@web3-react/core";
import { Contract, ContractFactory, ethers } from "ethers";
import EventABI from "../assets/EventABI.json";

import "../styles/event-create.scss";
import axios from "axios";

const BC =
  "60806040523480156200001157600080fd5b5060405162000a7a38038062000a7a833981810160405281019062000037919062000365565b81600090805190602001906200004f929190620000b3565b5082600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060029080519060200190620000a9929190620000b3565b5050505062000464565b828054620000c1906200042e565b90600052602060002090601f016020900481019282620000e5576000855562000131565b82601f106200010057805160ff191683800117855562000131565b8280016001018555821562000131579182015b828111156200013057825182559160200191906001019062000113565b5b50905062000140919062000144565b5090565b5b808211156200015f57600081600090555060010162000145565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001a48262000177565b9050919050565b620001b68162000197565b8114620001c257600080fd5b50565b600081519050620001d681620001ab565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200023182620001e6565b810181811067ffffffffffffffff82111715620002535762000252620001f7565b5b80604052505050565b60006200026862000163565b905062000276828262000226565b919050565b600067ffffffffffffffff821115620002995762000298620001f7565b5b620002a482620001e6565b9050602081019050919050565b60005b83811015620002d1578082015181840152602081019050620002b4565b83811115620002e1576000848401525b50505050565b6000620002fe620002f8846200027b565b6200025c565b9050828152602081018484840111156200031d576200031c620001e1565b5b6200032a848285620002b1565b509392505050565b600082601f8301126200034a5762000349620001dc565b5b81516200035c848260208601620002e7565b91505092915050565b6000806000606084860312156200038157620003806200016d565b5b60006200039186828701620001c5565b935050602084015167ffffffffffffffff811115620003b557620003b462000172565b5b620003c38682870162000332565b925050604084015167ffffffffffffffff811115620003e757620003e662000172565b5b620003f58682870162000332565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200044757607f821691505b602082108114156200045e576200045d620003ff565b5b50919050565b61060680620004746000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806306fdde0314610051578063392f37e91461006f5780638da5cb5b1461008d578063a49a1e7d146100ab575b600080fd5b6100596100c7565b604051610066919061035f565b60405180910390f35b610077610155565b604051610084919061035f565b60405180910390f35b6100956101e3565b6040516100a291906103c2565b60405180910390f35b6100c560048036038101906100c09190610526565b610209565b005b600080546100d49061059e565b80601f01602080910402602001604051908101604052809291908181526020018280546101009061059e565b801561014d5780601f106101225761010080835404028352916020019161014d565b820191906000526020600020905b81548152906001019060200180831161013057829003601f168201915b505050505081565b600280546101629061059e565b80601f016020809104026020016040519081016040528092919081815260200182805461018e9061059e565b80156101db5780601f106101b0576101008083540402835291602001916101db565b820191906000526020600020905b8154815290600101906020018083116101be57829003601f168201915b505050505081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b806002908051906020019061021f929190610223565b5050565b82805461022f9061059e565b90600052602060002090601f0160209004810192826102515760008555610298565b82601f1061026a57805160ff1916838001178555610298565b82800160010185558215610298579182015b8281111561029757825182559160200191906001019061027c565b5b5090506102a591906102a9565b5090565b5b808211156102c25760008160009055506001016102aa565b5090565b600081519050919050565b600082825260208201905092915050565b60005b838110156103005780820151818401526020810190506102e5565b8381111561030f576000848401525b50505050565b6000601f19601f8301169050919050565b6000610331826102c6565b61033b81856102d1565b935061034b8185602086016102e2565b61035481610315565b840191505092915050565b600060208201905081810360008301526103798184610326565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006103ac82610381565b9050919050565b6103bc816103a1565b82525050565b60006020820190506103d760008301846103b3565b92915050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61043382610315565b810181811067ffffffffffffffff82111715610452576104516103fb565b5b80604052505050565b60006104656103dd565b9050610471828261042a565b919050565b600067ffffffffffffffff821115610491576104906103fb565b5b61049a82610315565b9050602081019050919050565b82818337600083830152505050565b60006104c96104c484610476565b61045b565b9050828152602081018484840111156104e5576104e46103f6565b5b6104f08482856104a7565b509392505050565b600082601f83011261050d5761050c6103f1565b5b813561051d8482602086016104b6565b91505092915050565b60006020828403121561053c5761053b6103e7565b5b600082013567ffffffffffffffff81111561055a576105596103ec565b5b610566848285016104f8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806105b657607f821691505b602082108114156105ca576105c961056f565b5b5091905056fea26469706673582212207ae9fe1131749aff7b2469a4075a90d7cd5264af71f612bc5bdaf4f2c48e324164736f6c634300080c0033";

const EventCreate = () => {
  const [image, setImage] = useState<FileList | null>(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [datetime, setDatetime] = useState(new Date().toISOString());

  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [bc, setbc] = useState<string>();
  const { library } = useWeb3React();
  const signer = library.getSigner();
  console.log(signer);

  useEffect(() => {
    async function getbytecode() {
      var bc = await library.getCode(
        "0x4428d5424F822CbF061619bB68FC01d82Db5da11"
      );
      setbc(bc);
    }
    getbytecode();
  }, []);

  useEffect(() => {}, []);

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

    async function deployEvent() {
      // needs to be locally compiled bytecode for some reason
      var event = new ethers.ContractFactory(EventABI, BC, signer);
      var addr = await signer.getAddress();
      var res = await event.deploy(addr, title, metadataUri);
      await axios.post(
        "https://beta-even-ft-backend.onrender.com/api/v1/event/create",
        { address: res.address, ownerAddress: addr }
      );
    }
    deployEvent();
  };

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setImage(event.target.files);
  };

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
