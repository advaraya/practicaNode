"use strict";

var conn = require("../lib/connectMongoose.js");

const Anuncio = require("../models/Anuncio");
const anunciosjson = require("./anuncios.json");

conn.once("open", async () => {
  try {
    await execute();
    conn.close();
  } catch (error) {
    console.error("Ha habido un error..:(", error);
    process.exit(1);
  }
});
async function execute() {
  await Anuncio.deleteMany({});
  let listAnuncios = anunciosjson.anuncios;

  let insertResult = await Anuncio.insertMany(listAnuncios);
  console.log(insertResult);
}
