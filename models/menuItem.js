const mongoose = require("mongoose");
const MenuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
});

module.exports = BlogPost = mongoose.model("menuItem", MenuItemSchema);
