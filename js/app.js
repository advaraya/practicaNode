const express = require("express");
const app = express();
const port = 3000;
const listadoanuncios = require("./listadoAnuncios.js");
const Anuncio = require("../models/Anuncio");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.locals.title = "Nodepop";

app.get("/", (req, res) => res.send("¡Bienvenido a Nodepop!"));

app.get("/apiv1/anuncios", async (req, res, next) => {
  /*try {
    const name = req.query.name;
    const accion = req.query.accion;
    const limit = parseInt(req.query.limit || 10000);
    const skip = parseInt(req.query.skip);
    const sort = req.query.sort;
    const fields = req.query.fields;
    const price = req.query.price;

    const filtro = {};

    if (name) {
      filtro.name = name;
    }

    if (typeof accion === "Se busca") {
      filtro.accion = "Se busca";
    } else {
      filtro.accion = "Se vende";
    }

    const docs = await Anuncio.lista(filtro, limit, skip, sort, fields, price);
    console.log(docs);
    res.json(docs);
  } catch (err) {
    next(err);
  }*/

  listadoanuncios.getanuncios(function (result) {
    console.log(result);
    res.json(result);
  });
});
app.get("/apiv1/tags", (req, res) => {
  listadoanuncios.getanuncios(function (result) {
    var mistags = [];
    result.forEach((anuncio) => {
      var tagsDelAnuncio = anuncio.tags;
      tagsDelAnuncio.forEach((cadaTag) => {
        var comprobacionDeTags = mistags.includes(cadaTag);
        if (comprobacionDeTags === false) {
          mistags.push(cadaTag);
        }
      });
    });
    res.json(mistags);
  });
});

// POST
// Crea un Anuncio

app.post("/apiv1/creacion", async (req, res, next) => {
  //const Anuncio = require("../models/Anuncio");
  try {
    const anuncioData = req.body;
    console.log(1, anuncioData);
    //creamos el objeto en memoria
    const anuncio = new Anuncio(anuncioData);
    console.log(3, anuncio);
    //Lo guardamos
    const anuncioGuardado = await anuncio.save();
    console.log(2, anuncioGuardado);

    res.status(201).json({ result: anuncioGuardado });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(express.static("public"));
