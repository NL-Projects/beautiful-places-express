const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mongoose.model("Location", locationSchema);
