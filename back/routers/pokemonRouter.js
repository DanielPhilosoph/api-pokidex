const express = require("express");
const Pokedex = require("pokedex-promise-v2");
const fs = require("fs");
const P = new Pokedex();
const router = express.Router();

router.get("/get/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    const pokimonData = await P.getPokemonByName(id);
    res.send(getInfoJSON(pokimonData));
  } catch (error) {
    next(404);
  }
});

router.get("/query", async (req, res, next) => {
  //Search by Name - {params: {query: pokemon_name}}
  try {
    const name = req.query.query;
    const pokimonData = await P.getPokemonByName(name);
    res.send(getInfoJSON(pokimonData));
  } catch (error) {
    next(404);
  }
  // return pokemon
});

router.put("/catch/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let username = req.headers.username;
    const pokimonData = await P.getPokemonByName(id);
    let pokemonId = pokimonData.id;
    if (pokemonBeenCaught(pokemonId, username)) {
      throw "";
    } else {
      let data = { pokimonData };
      fs.appendFileSync(
        `./back/users/${req.headers.username}/${pokemonId}.json`,
        JSON.stringify(data)
      );
      res.json({ status: "caught", pokenom_id: pokemonId, username });
    }
  } catch (err) {
    next(403);
  }
});

router.delete("/release/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let username = req.headers.username;
    const pokimonData = await P.getPokemonByName(id);
    let pokemonId = pokimonData.id;
    if (pokemonBeenCaught(pokemonId, username)) {
      if (deleteNameFromDB(pokemonId, username)) {
        res.json({ status: "relesed", pokenom_id: pokemonId, username });
      } else {
        throw "";
      }
    } else {
      throw "";
    }
  } catch (error) {
    next(403);
  }
});

router.get("/", (req, res, next) => {
  try {
    let username = req.headers.username;
    let pokimonsArray = fs.readdirSync(`./back/users/${username}`);
    let pokimonsNameArray = [];
    for (let file of pokimonsArray) {
      let pokemonFileContent = fs.readFileSync(
        `./back/users/${username}/${file}`
      );
      let pokemonJSON = JSON.parse(pokemonFileContent);
      pokimonsNameArray.push(pokemonJSON.pokimonData.name);
    }
    res.json({ was_caught: pokimonsNameArray, username });
  } catch (error) {
    next("Couldn't read from users folder. check username");
  }
});

function pokemonBeenCaught(id, username) {
  try {
    let caughtPokinoms = fs.readdirSync(`./back/users/${username}`);
    for (let pokemonFile of caughtPokinoms) {
      if (id === parseInt(pokemonFile.split(".")[0].toLowerCase())) {
        return true;
      }
    }
    return false;
  } catch (error) {
    throw "";
  }
}

function deleteNameFromDB(id, username) {
  try {
    fs.unlinkSync(`./back/users/${username}/${id}.json`);
    return true;
  } catch (error) {
    return false;
  }
}

function getInfoJSON(pokimonInfo) {
  let name = pokimonInfo.name;
  let height = pokimonInfo.height;
  let wieght = pokimonInfo.wieght;
  let typeArray = [];
  for (let type of pokimonInfo.types) {
    typeArray.push(type.type.name);
  }
  let abilityArray = [];
  for (let ability of pokimonInfo.abilities) {
    abilityArray.push(ability.ability.name);
  }
  let front_pic = pokimonInfo.sprites.front_default;
  let back_pic = pokimonInfo.sprites.back_default;

  return {
    name,
    height,
    wieght,
    types: typeArray,
    front_pic,
    back_pic,
    abilities: abilityArray,
  };
}

module.exports = router;
