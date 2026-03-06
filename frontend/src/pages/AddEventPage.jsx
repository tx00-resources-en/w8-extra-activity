const AddEventPage = () => {
  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="create">
      <h2>Add a New Event</h2>
      <form onSubmit={submitForm}>
        <label>Title:</label>
        <input type="text" required />
        <label>Date:</label>
        <input type="date" required />
        <label>Location:</label>
        <input type="text" required />
        <label>Organizer Name:</label>
        <input type="text" required />
        <label>Organizer Email:</label>
        <input type="email" required />
        <label>Organizer Phone:</label>
        <input type="text" required />
        <button>Add Event</button>
      </form>
    </div>
  );
};

export default AddEventPage;
