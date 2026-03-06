const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Event = require('../models/eventModel');

const api = supertest(app);

const initialEvents = [
  {
    title: "Tech Conference",
    date: "2026-06-15",
    location: "Helsinki",
    organizer: { name: "John Doe", contactEmail: "john@example.com", contactPhone: "1234567890" },
  },
  {
    title: "Music Festival",
    date: "2026-07-20",
    location: "Tampere",
    organizer: { name: "Jane Smith", contactEmail: "jane@example.com", contactPhone: "0987654321" },
  },
];

beforeEach(async () => {
  await Event.deleteMany({});
  await Event.insertMany(initialEvents);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/events', () => {
  test('returns the correct number of events as JSON', async () => {
    const res = await api
      .get('/api/events')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body).toHaveLength(initialEvents.length);
  });
});

describe('POST /api/events', () => {
  test('creates a valid event and returns 201', async () => {
    const newEvent = {
      title: "Art Exhibition",
      date: "2026-08-10",
      location: "Espoo",
      organizer: { name: "Alice Wonder", contactEmail: "alice@example.com", contactPhone: "1112223333" },
    };

    const res = await api
      .post('/api/events')
      .send(newEvent)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(res.body.title).toBe(newEvent.title);

    const allEvents = await Event.find({});
    expect(allEvents).toHaveLength(initialEvents.length + 1);
  });

  test('returns 400 when a required field is missing', async () => {
    const invalidEvent = {
      date: "2026-09-01",
      location: "Oulu",
      organizer: { name: "Bob", contactEmail: "bob@example.com", contactPhone: "4445556666" },
    };

    await api
      .post('/api/events')
      .send(invalidEvent)
      .expect(400);

    const allEvents = await Event.find({});
    expect(allEvents).toHaveLength(initialEvents.length);
  });
});

describe('GET /api/events/:eventId', () => {
  test('returns a single event by valid ID', async () => {
    const events = await Event.find({});
    const eventToView = events[0];

    const res = await api
      .get(`/api/events/${eventToView._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body.title).toBe(eventToView.title);
  });

  test('returns 400 for an invalid ID format', async () => {
    await api
      .get('/api/events/invalidid123')
      .expect(400);
  });
});

describe('DELETE /api/events/:eventId', () => {
  test('deletes an event and reduces the count', async () => {
    const events = await Event.find({});
    const eventToDelete = events[0];

    await api
      .delete(`/api/events/${eventToDelete._id}`)
      .expect(200);

    const remainingEvents = await Event.find({});
    expect(remainingEvents).toHaveLength(initialEvents.length - 1);

    const titles = remainingEvents.map((e) => e.title);
    expect(titles).not.toContain(eventToDelete.title);
  });
});

describe('PUT /api/events/:eventId', () => {
  test('updates an event successfully', async () => {
    const events = await Event.find({});
    const eventToUpdate = events[0];

    const updatedData = {
      title: "Updated Conference",
      date: "2026-06-20",
      location: "Turku",
      organizer: { name: "John Updated", contactEmail: "john.updated@example.com", contactPhone: "9999999999" },
    };

    const res = await api
      .put(`/api/events/${eventToUpdate._id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(res.body.title).toBe(updatedData.title);
    expect(res.body.location).toBe(updatedData.location);
    expect(res.body.organizer.name).toBe(updatedData.organizer.name);
  });
});
