require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.use(cors());
app.use(express.json());

const postRouter = require("../routes/post");
app.use("/posts", postRouter);
const categoryRouter = require("../routes/category");
app.use("/categories", categoryRouter);

app.listen(process.env.PORT || 3000, () => console.log("Server started"));
