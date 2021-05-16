const express = require("express");
const PORT = 3000;
const app = express();


app.get("/", (req,res) => {
    res.sendStatus(200);
})
app.listen(PORT, () => {
  console.log("server running on port ", PORT);
});
