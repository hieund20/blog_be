require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const timeout = require("connect-timeout");

app.use(timeout("5s"));
app.use(cors());
app.use(express.json());
app.use(haltOnTimedout);

const postRouter = require("./routes/post");
app.use("/posts", postRouter);
const categoryRouter = require("./routes/category");
app.use("/categories", categoryRouter);

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 3000, () => console.log("Server started"));
  })
  .catch((err) => {
    console.log("err", err);
  });
