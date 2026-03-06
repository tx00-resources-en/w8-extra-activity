import EventListing from "./EventListing";

const EventListings = () => {
  return (
    <div className="rental-list">
      <EventListing
        event={{
          title: "Sample Event",
          date: "2026-06-15",
          location: "Helsinki",
          organizer: {
            name: "John Doe",
            contactEmail: "john@example.com",
            contactPhone: "1234567890",
          },
        }}
      />
    </div>
  );
};

export default EventListings;
