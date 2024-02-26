const express = require("express");
const router = express.Router();
// const multer = require("multer");

const MenuItem = require("../../models/menuItem");
// let upload = multer({ storage, fileFilter });

const url = "https://mern-cms-backend.adaptable.app/";
router.get(url + "/test", (req, res) => res.send("Test route is working"));

router.get("/", (req, res) => {
  BlogPost.find()
    .then((posts) => res.json(posts))
    .catch((err) =>
      res.status(404).json({ noPostsFound: "no posts were found" })
    );
});

router.get("/:id", (req, res) => {
  BlogPost.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(404).json({ nobookfound: "No Post found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
  BlogPost.create(req.body)
    .then((book) => res.json({ msg: "Post posted successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to post this post" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  BlogPost.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  BlogPost.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "Post entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such post" }));
});

module.exports = router;
