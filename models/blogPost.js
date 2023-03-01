const mongoose = require("mongoose");
const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
  },

  cover_image: {
    type: String,
    required: true,
  },

  aux_img_1: {
    type: String,
    required: false,
  },

  aux_img_2: {
    type: String,
    required: false,
  },

  aux_img_3: {
    type: String,
    required: false,
  },

  aux_img_4: {
    type: String,
    required: false,
  },
});

module.exports = BlogPost = mongoose.model("blogPost", BlogPostSchema);
