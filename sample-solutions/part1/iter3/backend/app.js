const express = require('express');
const cors = require('cors');
const eventRouter = require('./routes/eventRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/events', eventRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
