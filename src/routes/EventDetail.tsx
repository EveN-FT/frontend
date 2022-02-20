import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import { Event } from "./Explore";

import metadata from "../assets/placeholders/metadata.json";
import "../styles/event-detail.scss";

const EventDetail = () => {
  const { address } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <main className="event-detail">
        <div>
          <h1 className="title">{metadata.name}</h1>
          <p className="description">{metadata.description}</p>
          <table>
            <tr>
              <th>Date</th>
              <td>
                {
                  metadata.attributes.find((element) => element.key === "/time")
                    ?.value
                }
              </td>
            </tr>
            <tr>
              <th>Venue</th>
              <td>
                {
                  metadata.attributes.find(
                    (element) => element.key === "/venue"
                  )?.value
                }
              </td>
            </tr>
            <tr>
              <th>City</th>
              <td>
                {
                  metadata.attributes.find((element) => element.key === "/city")
                    ?.value
                }
              </td>
            </tr>
          </table>
          <Link to={`/event/${address}/tickets`}>
            <button>Buy Tickets</button>
          </Link>
        </div>
        <img src={metadata.image.url.ORIGINAL} alt="" />
      </main>
    </>
  );
};

export default EventDetail;
