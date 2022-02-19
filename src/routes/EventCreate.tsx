import { useNavigate, Link } from "react-router-dom";
import "../styles/event-create.scss";

const EventCreate = () => {
  const navigate = useNavigate();

  return (
    <main className="create-event">
      <span className="close" onClick={() => navigate(-1)}></span>
      <h1>Create</h1>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder="Event Title" />
      </form>
    </main>
  );
};

export default EventCreate;
