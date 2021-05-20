require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// Handling JSON
app.use(express.json());

// Static folder and files
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Cross-origin resource sharing
app.use(cors());

// Locations router
const locationsRouter = require("./routes/locations");
app.use("/locations", locationsRouter);

// Image upload service
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb("null", "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res, next) => {
  console.log(JSON.stringify(req.file));
  return res.json({message:req.file.path})
});

// Server start
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
