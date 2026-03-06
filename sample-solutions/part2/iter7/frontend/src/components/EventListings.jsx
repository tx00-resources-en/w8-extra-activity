import { useState, useEffect } from 'react';
import EventListing from './EventListing';

const EventListings = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <div className="rental-list">
      <h2>All Events</h2>
      {events.map((event) => (
        <EventListing key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventListings;
