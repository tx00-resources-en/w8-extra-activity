const Event = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  const savedEvent = await event.save();
  res.status(201).json(savedEvent);
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
};

const updateEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, {
    new: true,
    runValidators: true,
  });
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.eventId);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: "Event not found" });
  }
};

module.exports = { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent };
