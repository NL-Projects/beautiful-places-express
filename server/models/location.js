const mongoose = require("mongoose");
const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: String,
  text: [String],
  imageURL: [String],
});

module.exports = mongoose.model("Location", locationSchema);
