const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Post", postSchema);
