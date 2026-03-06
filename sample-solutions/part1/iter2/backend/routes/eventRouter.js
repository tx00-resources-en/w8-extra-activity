const express = require('express');
const router = express.Router();
const { getAllEvents, createEvent, getEventById, deleteEvent } = require('../controllers/eventControllers');

router.get('/', getAllEvents);
router.post('/', createEvent);
router.get('/:eventId', getEventById);
router.delete('/:eventId', deleteEvent);

module.exports = router;
