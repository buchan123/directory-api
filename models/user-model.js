const mongoose = require("mongoose");
const contactSchema = require("./contact-model");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: "string",
  password: "string",
  email: "string",
  contacts: [contactSchema],
});

module.exports = new mongoose.model("User", userSchema);
