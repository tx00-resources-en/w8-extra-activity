const Event = require("../models/eventModel");

// GET /api/events
const getAllEvents = async (req, res) => {
  res.send("getAllEvents");
};

// POST /api/events
const createEvent = async (req, res) => {
  res.send("createEvent");
};

// GET /api/events/:eventId
const getEventById = async (req, res) => {
  res.send("getEventById");
};

// PUT /api/events/:eventId
const updateEvent = async (req, res) => {
  res.send("updateEvent");
};

// DELETE /api/events/:eventId
const deleteEvent = async (req, res) => {
  res.send("deleteEvent");
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
};
