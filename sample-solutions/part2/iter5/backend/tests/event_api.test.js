const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Event = require("../models/eventModel");
const mongoose = require("mongoose");

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

describe("GET /api/events", () => {
  test("should return all events as JSON", async () => {
    const response = await api
      .get("/api/events")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body).toHaveLength(initialEvents.length);
  });
});

describe("POST /api/events", () => {
  test("should create a new event", async () => {
    const newEvent = {
      title: "Art Exhibition",
      date: "2026-08-10",
      location: "Espoo",
      organizer: { name: "Alice Wonder", contactEmail: "alice@example.com", contactPhone: "1112223333" },
    };
    await api
      .post("/api/events")
      .send(newEvent)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/events");
    expect(response.body).toHaveLength(initialEvents.length + 1);
  });

  test("should return 400 if required fields are missing", async () => {
    const newEvent = { title: "Incomplete Event" };
    await api.post("/api/events").send(newEvent).expect(400);
  });
});

describe("GET /api/events/:eventId", () => {
  test("should return a single event by ID", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    const response = await api
      .get(`/api/events/${eventId}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.title).toBe(events[0].title);
  });

  test("should return 400 for an invalid ID", async () => {
    await api.get("/api/events/invalidid").expect(400);
  });
});

describe("DELETE /api/events/:eventId", () => {
  test("should delete an event by ID", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    await api.delete(`/api/events/${eventId}`).expect(200);
    const response = await api.get("/api/events");
    expect(response.body).toHaveLength(initialEvents.length - 1);
  });
});

describe("PUT /api/events/:eventId", () => {
  test("should update an event by ID", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    const updatedData = { title: "Updated Conference" };
    const response = await api
      .put(`/api/events/${eventId}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.title).toBe("Updated Conference");
  });
});
