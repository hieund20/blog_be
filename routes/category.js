const express = require("express");
const router = express.Router();
const Category = require("../models/category");

//GET
router.get("/", async (req, res) => {
  try {
    const cates = await Category.find();
    res.json(cates);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

//GET BY ID
const getCate = async (req, res, next) => {
  let cate;
  try {
    cate = await Category.findById(req.params.id);
    if (cate == null) {
      return res.status(404).json({
        message: "Cannot find category",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }

  res.cate = cate;
  next();
};
router.get("/:id", getCate, async (req, res) => {
  await res.send(res.cate);
});

//POST
router.post("/", async (req, res) => {
  const cate = new Category({
    name: req.body.name,
  });
  try {
    const newCate = await cate.save();
    res.status(201).json(newCate);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//PATCH
router.patch("/:id", getCate, async (req, res) => {
  if (req.body.name != null) {
    res.post.name = req.body.name;
  }
  try {
    const updatedCate = await res.cate.save();
    res.json(updatedCate);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//DELETE
router.delete("/:id", getCate, async (req, res) => {
  try {
    await res.cate.remove();
    res.json({
      message: "Deleted category",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
