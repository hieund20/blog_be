const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//GET
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//GET BY ID
const getPost = async (req, res, next) => {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({
        message: "Cannot find post",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }

  res.post = post;
  next();
};
router.get("/:id", getPost, async (req, res) => {
  await res.send(res.post);
});

//POST
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    category_id: req.body.category_id,
  });
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//PATCH
router.patch("/:id", getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
    res.post.content = req.body.content;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//DELETE
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({
      message: "Deleted post",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
