const EventListing = ({ event }) => {
  return (
    <div className="rental-preview">
      <h2>{event.title}</h2>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Organizer: {event.organizer?.name}</p>
    </div>
  );
};

export default EventListing;
