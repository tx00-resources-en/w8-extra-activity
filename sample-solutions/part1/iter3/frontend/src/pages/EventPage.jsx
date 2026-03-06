import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEvent(data))
      .catch((err) => console.error('Error fetching event:', err));
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      navigate('/');
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rental-preview">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Organizer:</strong> {event.organizer.name}</p>
      <p><strong>Email:</strong> {event.organizer.contactEmail}</p>
      <p><strong>Phone:</strong> {event.organizer.contactPhone}</p>
      <Link to={`/edit-event/${event._id}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EventPage;
