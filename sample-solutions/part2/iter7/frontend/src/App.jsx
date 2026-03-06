import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import AddEventPage from "./pages/AddEventPage";
import EventPage from "./pages/EventPage";
import EditEventPage from "./pages/EditEventPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-event" element={<AddEventPage token={token} />} />
            <Route path="/events/:id" element={<EventPage token={token} />} />
            <Route path="/edit-event/:id" element={<EditEventPage token={token} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
