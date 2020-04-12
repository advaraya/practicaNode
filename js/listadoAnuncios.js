exports.getanuncios = function (callback) {
  require("../lib/connectMongoose.js");

  const Anuncio = require("../models/Anuncio");

  Anuncio.find({}, function (error, result) {
    callback(result);
  });
};
