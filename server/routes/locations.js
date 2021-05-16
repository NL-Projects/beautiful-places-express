const express = require("express");
const router = express.Router();
const Location = require("../models/location");

// Get all
router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get one
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});
// Create one
router.post("/", async (req, res) => {
  const location = new Location({
    name: req.body.name,
    text: req.body.text,
    imageURL: req.body.imageURL,
  });
  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Update one
router.patch("/:id", (req, res) => {});
// Delete one
router.delete("/:id", (req, res) => {});
module.exports = router;
