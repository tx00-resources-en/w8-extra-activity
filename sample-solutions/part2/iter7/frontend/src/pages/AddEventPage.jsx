import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEventPage = ({ token }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [organizerPhone, setOrganizerPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const event = {
      title,
      date,
      location,
      organizer: { name: organizerName, contactEmail: organizerEmail, contactPhone: organizerPhone },
    };
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(event),
    });
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Event</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <label>Organizer Name:</label>
        <input type="text" value={organizerName} onChange={(e) => setOrganizerName(e.target.value)} required />
        <label>Organizer Email:</label>
        <input type="email" value={organizerEmail} onChange={(e) => setOrganizerEmail(e.target.value)} required />
        <label>Organizer Phone:</label>
        <input type="text" value={organizerPhone} onChange={(e) => setOrganizerPhone(e.target.value)} required />
        <button>Add Event</button>
      </form>
    </div>
  );
};

export default AddEventPage;
