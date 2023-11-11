const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();
const port = process.env.PORT || 3500;
const databaseURL = process.env.DATABASE_URL;
const booksRouter = require("./controllers/booksController");
// Middleware setup
app.use(morgan("combined"));

const allowedOrigins = [
  "http://localhost:3000",
  "http://151.106.97.221",
  "https://151.106.97.221",
  "https://bookstore.sushantk.com",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

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

// Parse JSON
app.use(express.json());
// Routers
app.use("/books", booksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.on("error", (err) => {
  console.error("Server Error:", err);
});

module.exports = app;
