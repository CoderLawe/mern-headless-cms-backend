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
const searchResults = require("./routes/api/searchResults");
const houses = require("./routes/api/houses");
const payments = require("./routes/api/payments");
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
// app.use("/api/payments", payments)
// app.use("/api/searchResults", searchResults);

app.use("/api/houses", houses)
app.post("/payment", async (req, res)   => {
  const {amount, id}  = req.body;
  try {
      const payment = await stripe.paymentIntents.create({amount, currency:"USD", description:"Spatula", payment_method:id, confirm:true,return_url:"http://localhost:3000"})
      console.log("Payment", payment)
      res.json({
          message:"Payment Succesful",
          success:true
      })
  } catch (error) {
          console.log("error", error)
          res.json({
              message:"Payment Failed",
              success:false
          })
  }
})


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
