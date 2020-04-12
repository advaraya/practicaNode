"use strict";

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

var conn = mongoose.connection;

conn.on("error", (err) => {
  console.error("mongodb connection error", err);
  process.exit(1);
});

conn.once("open", () => {
  console.info("Connected to mongodb.");
});

mongoose.connect("mongodb://localhost/practica", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = conn;
