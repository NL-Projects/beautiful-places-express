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
app.use(express.urlencoded());

// Cross-origin resource sharing
app.use(cors());

// Static folder and files
app.use(express.static("public"));
app.use("/images", express.static("images"));

// Locations router
const locationsRouter = require("./routes/locations");
app.use("/locations", locationsRouter);

// Image upload service
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/upload", upload.array("images", 2), (req, res, next) => {
  var imageURL = [];
  for (var i = 0; i < req.files.length; i++) {
    imageURL.push("http://localhost:3000/images/" + req.files[i].filename);
  }
  res.send(imageURL);
});

// Server start
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
