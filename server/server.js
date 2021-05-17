require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

// app.use(cors());
app.use(express.json());
app.use(cors())

const locationsRouter = require("./routes/locations");
app.use("/locations", locationsRouter);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
