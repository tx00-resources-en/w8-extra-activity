import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EventPage = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data));
  }, [id]);

  const handleDelete = async () => {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      navigate("/");
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="rental-preview">
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Organizer: {event.organizer?.name}</p>
      <p>Contact Email: {event.organizer?.contactEmail}</p>
      <p>Contact Phone: {event.organizer?.contactPhone}</p>
      {token && (
        <>
          <Link to={`/edit-event/${event._id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default EventPage;
