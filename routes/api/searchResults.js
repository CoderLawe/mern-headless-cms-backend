const express = require("express");
const router = express.Router();
// const multer = require("multer");

const searchResults = require("../../models/searchResults");
// let upload = multer({ storage, fileFilter });

const url = "https://mern-cms-backend.adaptable.app/";
router.get(url + "/test", (req, res) => res.send("Test route is working"));

router.get("/", (req, res) => {
  searchResults.find()
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ noPostsFound: "no posts were found" })
    );
});

router.get("/:id", (req, res) => {
  searchResults.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ nobookfound: "No Post found" }));
});

router.post("/", (req, res) => {
    searchResults.create(req.body)
      .then((book) => res.json({ msg: "Post posted successfully" }))
      .catch((err) =>
        res.status(400).json({ error: "Unable to post this post" })
      );
  });

// @route GET api/books
// @description add/save book
// @access Public
