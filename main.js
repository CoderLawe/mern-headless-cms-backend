const express = require("express");
const mongoose = require("mongoose");
// import connectDB from "./config/db";
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const db = process.env.MONGO_URI;

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// Route
const books = require("./routes/api/books");
const posts = require("./routes/api/blogPosts");
const menuItems = require("./routes/api/menuItems");

// Connect Database
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(db, {
      useNewUrlParser: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

// Adding the actual api routes...

app.use("/api/books", books);
app.use("/api/posts", posts);
app.use("/api/items", menuItems);
const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
