const express = require("express");
var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();
const PORT = 3000;

const app = express();

app.get("/", function (req, res) {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
