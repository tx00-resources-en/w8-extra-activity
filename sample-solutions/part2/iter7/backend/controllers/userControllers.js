const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

// POST /api/users/signup
const signup = async (req, res) => {
  const { name, email, password, gender, date_of_birth, occupation, phone } = req.body;
  // Check if user already exists by email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "Email is already in use" });
  }
  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  // Create user
  const user = new User({
    name,
    email,
    password: passwordHash,
    gender,
    date_of_birth,
    occupation,
    phone,
  });
  const savedUser = await user.save();
  res.status(201).json(savedUser);
};

// POST /api/users/login
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const userForToken = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(userForToken, config.SECRET);
  res.status(200).json({ token, name: user.name, email: user.email });
};

module.exports = { signup, login };
