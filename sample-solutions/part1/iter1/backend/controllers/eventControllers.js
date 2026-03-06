const Event = require('../models/eventModel');

const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.json(events);
};

const createEvent = async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
};

module.exports = { getAllEvents, createEvent };
