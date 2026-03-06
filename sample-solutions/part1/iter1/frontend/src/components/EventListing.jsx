const EventListing = ({ event }) => {
  return (
    <div className="rental-preview">
      <h2>{event.title}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Organizer:</strong> {event.organizer.name}</p>
    </div>
  );
};

export default EventListing;
