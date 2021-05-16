const express = require("express");
const router = express.Router();

// Get all
router.get("/", (req, res) => {
  res.send("Hellow World");
});
// Get one
router.get("/:id", (req, res) => {});
// Create one
router.post("/:id", (req, res) => {});
// Update one
router.patch("/:id", (req, res) => {});
// Delete one
router.delete("/:id", (req, res) => {});
module.exports = router;
