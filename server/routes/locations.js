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
router.get("/:id", getLocation, (req, res) => {
  res.send(res.location);
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
router.patch("/:id", getLocation, async (req, res) => {
  if (req.body.name != null) {
    res.location.name = req.body.name;
  }
  if (req.body.text != null) {
    res.location.text = req.body.text;
  }
  if (req.body.name != null) {
    res.location.imageURL = req.body.imageURL;
  }
  try {
    const updatedLocation = await res.location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Delete one
router.delete("/:id", getLocation, async (req, res) => {
  try {
    await res.location.remove();
    res.json({ message: "Location removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getLocation(req, res, next) {
  try {
    location = await Location.findById(req.params.id);
    if (location == null) {
      return res.status(404).json({ message: "Location not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.location = location;
  next();
}
module.exports = router;
