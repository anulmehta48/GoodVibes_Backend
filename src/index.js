const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/route");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const DB_USER = process.env.DB_USER;
mongoose
  .connect(DB_USER)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", router);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on " + 3000);
});
