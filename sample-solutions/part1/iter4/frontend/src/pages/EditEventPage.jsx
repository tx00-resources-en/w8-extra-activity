import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerEmail, setOrganizerEmail] = useState('');
  const [organizerPhone, setOrganizerPhone] = useState('');

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDate(data.date?.substring(0, 10));
        setLocation(data.location);
        setOrganizerName(data.organizer.name);
        setOrganizerEmail(data.organizer.contactEmail);
        setOrganizerPhone(data.organizer.contactPhone);
      })
      .catch((err) => console.error('Error fetching event:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {
      title,
      date,
      location,
      organizer: {
        name: organizerName,
        contactEmail: organizerEmail,
        contactPhone: organizerPhone,
      },
    };

    const res = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent),
    });

    if (res.ok) {
      navigate(`/events/${id}`);
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
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
        <input type="tel" value={organizerPhone} onChange={(e) => setOrganizerPhone(e.target.value)} required />

        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEventPage;
