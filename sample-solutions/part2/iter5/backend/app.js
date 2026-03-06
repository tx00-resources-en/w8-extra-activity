const express = require('express');
const cors = require('cors');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');
const { unknownEndpoint, errorHandler, requestLogger } = require('./middleware/customMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
