const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    occupation: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("User", userSchema);
