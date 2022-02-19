import { useNavigate, Link } from "react-router-dom";
import { useState, FormEventHandler } from "react";
import "../styles/event-create.scss";

const EventCreate = () => {
  const navigate = useNavigate();
  const [datetime, setDatetime] = useState(new Date().toISOString());

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
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
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Event Description"
          rows={4}
          maxLength={280}
        />
        <label htmlFor="venue">Venue</label>
        <input
          type="text"
          id="venue"
          name="venue"
          placeholder="Venue"
          maxLength={40}
        />
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          maxLength={40}
        />
        <label htmlFor="datetime">Date & Time</label>
        <input type="datetime-local" id="datetime" name="datetime" />
        <button type="submit">Create</button>
      </form>
    </main>
  );
};

export default EventCreate;
