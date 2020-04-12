"use strict";

var mongoose = require("mongoose");

//Crear esquema
const Schema = mongoose.Schema;

const anuncioSchema = new Schema({
  nombre: String,
  accion: String,
  precio: Number,
  foto: String,
  tags: [String],
});

/*anuncioSchema.statics.lista = function (
  filtro,
  limit,
  skip,
  sort,
  //fields,
  price
) {
  const query = Anuncio.find(filtro);
  console.log("base de datos", filtro);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(select);
  return query.exec();
};*/

//Con el esquema creamos un modelo
const Anuncio = mongoose.model("Anuncio", anuncioSchema);

//Se exporta el modelo
module.exports = Anuncio;
