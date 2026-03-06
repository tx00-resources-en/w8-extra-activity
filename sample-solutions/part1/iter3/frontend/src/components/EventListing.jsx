import { Link } from 'react-router-dom';

const EventListing = ({ event }) => {
  return (
    <div className="rental-preview">
      <Link to={`/events/${event._id}`}>
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Organizer:</strong> {event.organizer.name}</p>
      </Link>
    </div>
  );
};

export default EventListing;
