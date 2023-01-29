const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

require("dotenv").config();
const app = express();

//
app.set("view engine", "ejs");

app.use(methodOverride("_method"));

//
app.use(express.urlencoded({ extended: true }));

//get port number & provide default port
const port = process.env.PORT || 3000;

const mongoUri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}`;
console.log(mongoUri);
mongoose.connect(mongoUri, { useNewUrlParser: true }, () => {
  console.log(
    "establishing connection with mongo DB: " + process.env.MONGO_DB_NAME
  );
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected successfully");
});

db.on("error", (err) => {
  console.log("unable to establish connection: " + err.message);
});

db.on("disconnected", () => {
  console.log("successfully disconnected from MongoDB");
});

const fruit = require("./model/fruit_schema");

// to start the app and listen on port mentioned
app.listen(port, () => {
  console.log("Fruits app is listening on port: " + port);
});
