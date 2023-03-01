const mongoose = require("mongoose");
const config = require("config");
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const db = process.env.MONGO_URI;

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

module.exports = connectDB;
