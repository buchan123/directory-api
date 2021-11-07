const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  middleName: "string",
  lastName: { type: String, required: true },
  email: "string",
  mobileNum: "string",
  landlineNum: "string",
  notes: "string",
  dateAdded: { type: Date, default: Date.now },
  dateModified: "date",
  views: {
    type: Number,
    default: 0,
  },
  lastViewed: "number",
  viewsPerDay: {
    type: Array,
  },
});

module.exports = contactSchema;
