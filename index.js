require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const personRoutes = require('./routes/personRoutes')
const cors = require('cors');
const dbConnect = process.env.DB_CONNECT


app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use('/person', personRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Express ON" });
});

mongoose
  .connect(
    dbConnect
  )
  .then(() => {
    app.listen(3000 || PORT);
    console.log("MongoDB connected!");
  }).catch((err) => console.log(err))

