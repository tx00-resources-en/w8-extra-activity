const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");

// GET /api/events
router.get("/", getAllEvents);

// POST /api/events
router.post("/", createEvent);

// GET /api/events/:eventId
router.get("/:eventId", getEventById);

// PUT /api/events/:eventId
router.put("/:eventId", updateEvent);

// DELETE /api/events/:eventId
router.delete("/:eventId", deleteEvent);

module.exports = router;
