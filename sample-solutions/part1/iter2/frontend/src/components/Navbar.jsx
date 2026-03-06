import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Event Listings</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/add-event">Add Event</Link>
      </div>
    </nav>
  );
};

export default Navbar;
