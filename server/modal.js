const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  img: String,
  job: String,
});

const contactModel = mongoose.model("contact", contactsSchema);

module.exports = contactModel;
