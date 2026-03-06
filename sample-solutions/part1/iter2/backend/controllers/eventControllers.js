const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
};

const deleteEvent = async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
};

module.exports = { getAllEvents, createEvent, getEventById, deleteEvent };
