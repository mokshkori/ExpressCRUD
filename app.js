const express = require("express");
const app = express();
const genresHandler = require("./routes/genres");
const homeHandler = require("./routes/home");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vidly").then((value) => {
  console.log("Connected to db");
});

app.use(express.json());
app.use("/api/genres", genresHandler);
app.use("/", homeHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
