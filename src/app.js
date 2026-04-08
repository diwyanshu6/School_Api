// src/app.js
const express = require("express");
const cors = require("cors");
const schoolRoutes = require("./routes/schoolRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running ");
});

app.use("/", schoolRoutes);

app.use(errorHandler);

module.exports = app;