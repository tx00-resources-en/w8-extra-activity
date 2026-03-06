const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Event = require("../models/eventModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

const testUser = {
  name: "Test User",
  email: "test@example.com",
  password: "testPassword123",
  gender: "Male",
  date_of_birth: "1990-05-15",
  occupation: "Developer",
  phone: "1234567890",
};

let token = null;

beforeEach(async () => {
  await Event.deleteMany({});
  await User.deleteMany({});
  await Event.insertMany(initialEvents);
  // Create a test user and get token
  const passwordHash = await bcrypt.hash(testUser.password, 10);
  await new User({ ...testUser, password: passwordHash }).save();
  const loginResponse = await api
    .post("/api/users/login")
    .send({ email: testUser.email, password: testUser.password });
  token = loginResponse.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

// ==================== Event CRUD Tests ====================

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
  test("should create a new event when authenticated", async () => {
    const newEvent = {
      title: "Art Exhibition",
      date: "2026-08-10",
      location: "Espoo",
      organizer: { name: "Alice", contactEmail: "alice@example.com", contactPhone: "1112223333" },
    };
    await api
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send(newEvent)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const response = await api.get("/api/events");
    expect(response.body).toHaveLength(initialEvents.length + 1);
  });

  test("should return 401 without token", async () => {
    const newEvent = {
      title: "Unauthorized Event",
      date: "2026-09-01",
      location: "Oulu",
      organizer: { name: "Bob", contactEmail: "bob@example.com", contactPhone: "4445556666" },
    };
    await api.post("/api/events").send(newEvent).expect(401);
  });

  test("should return 400 if required fields are missing", async () => {
    const newEvent = { title: "Incomplete Event" };
    await api
      .post("/api/events")
      .set("Authorization", `Bearer ${token}`)
      .send(newEvent)
      .expect(400);
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

describe("PUT /api/events/:eventId", () => {
  test("should update an event when authenticated", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    const response = await api
      .put(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Conference" })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.title).toBe("Updated Conference");
  });

  test("should return 401 without token", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    await api
      .put(`/api/events/${eventId}`)
      .send({ title: "Should Fail" })
      .expect(401);
  });
});

describe("DELETE /api/events/:eventId", () => {
  test("should delete an event when authenticated", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    await api
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const response = await api.get("/api/events");
    expect(response.body).toHaveLength(initialEvents.length - 1);
  });

  test("should return 401 without token", async () => {
    const events = await Event.find({});
    const eventId = events[0]._id.toString();
    await api.delete(`/api/events/${eventId}`).expect(401);
  });
});

// ==================== User Auth Tests ====================

describe("POST /api/users/signup", () => {
  test("should create a new user", async () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
      password: "newPassword123",
      gender: "Female",
      date_of_birth: "1995-03-20",
      occupation: "Designer",
      phone: "9998887777",
    };
    const response = await api
      .post("/api/users/signup")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.password).not.toBe(newUser.password); // should be hashed
  });

  test("should return 400 if email already exists", async () => {
    const duplicateUser = { ...testUser, phone: "5556667777" };
    await api.post("/api/users/signup").send(duplicateUser).expect(400);
  });
});

describe("POST /api/users/login", () => {
  test("should login with correct credentials and return token", async () => {
    const response = await api
      .post("/api/users/login")
      .send({ email: testUser.email, password: testUser.password })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.token).toBeDefined();
    expect(response.body.name).toBe(testUser.name);
    expect(response.body.email).toBe(testUser.email);
  });

  test("should return 401 with wrong password", async () => {
    await api
      .post("/api/users/login")
      .send({ email: testUser.email, password: "wrongpassword" })
      .expect(401);
  });

  test("should return 401 with non-existent email", async () => {
    await api
      .post("/api/users/login")
      .send({ email: "nobody@example.com", password: "anypassword" })
      .expect(401);
  });
});
