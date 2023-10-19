const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;

// Middleware setup
app.use(morgan("combined"));

// MongoDB Atlas Connection
mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("MongoDB Atlas Connection Error:", err);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.on("error", (err) => {
  console.error("Server Error:", err);
});
