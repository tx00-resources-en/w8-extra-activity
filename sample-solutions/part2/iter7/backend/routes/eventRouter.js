const express = require("express");
const router = express.Router();
const { getAllEvents, createEvent, getEventById, updateEvent, deleteEvent } = require("../controllers/eventControllers");
const { auth } = require("../middleware/customMiddleware");

router.get("/", getAllEvents);
router.post("/", auth, createEvent);
router.get("/:eventId", getEventById);
router.put("/:eventId", auth, updateEvent);
router.delete("/:eventId", auth, deleteEvent);

module.exports = router;
