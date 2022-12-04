const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Category", categorySchema);
