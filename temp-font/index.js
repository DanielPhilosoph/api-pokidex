//========================================================================
// const axios = require("axios");
// //const fetch = require("node-fetch");
// async function handleClick() {
//   const headersObj = {
//     "Access-Control-Allow-Headers": "*",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "*",
//     "Content-Type": "application/json",
//     username: "daniel",
//   };
//   try {
//     const response = await axios.get("http://localhost:3000/pokemon", {
//       headers: headersObj,
//     });
//     console.log(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// handleClick();

//=========================================================================

document
  .querySelector("#caught_pokemons_btn")
  .addEventListener("click", OnFindPokemonsClick);
document
  .querySelector("#search_by_id_btn")
  .addEventListener("click", OnSearchIdClick);
document
  .querySelector("#search_by_name_btn")
  .addEventListener("click", OnSearchNameClick);
document.querySelector("#catch_btn").addEventListener("click", OnCatchClick);
document.querySelector("#relese_btn").addEventListener("click", OnReleseClick);

// ===================================
// ======= Event Handlers ============
// ===================================

function OnFindPokemonsClick(event) {
  console.log("find pokemons");
  createTypeList(["mr", "dani"]);
  // Find pokemons by user name (input)
}

function OnSearchIdClick() {
  console.log("Search id");
  // Example
  // createCard(
  //   "Chard",
  //   "23",
  //   "45",
  //   "./img/pok.png",
  //   "./img/pok.png",
  //   ["ability", "ability2"],
  //   ["type1", "type2"]
  // );
  // Find pokemon by ID with user name (input)
}

function OnSearchNameClick() {
  console.log("Search name");
  // Find pokemon by Name with user name (input)
}

function OnCatchClick() {
  console.log("catch");
  // Catch pokemon by ID for user (user name input)
}

function OnReleseClick() {
  console.log("relese");
  // Relese pokemon by ID for user (user name input)
}

function onMouseEnterImg(event, backImgUrl) {
  event.target.src = backImgUrl;
}

function onMouseLeaveImg(event, imgUrl) {
  event.target.src = imgUrl;
}

// ===================================
// ======= DOM Functions =============
// ===================================

function createCard(
  name,
  Hieght,
  Wieght,
  imgUrl,
  backImgUrl,
  abilities,
  types
) {
  // Big Image - can turn on hover
  /////////////////////////////////
  let img = createElement(
    "img",
    [],
    ["card-img-top"],
    {
      id: "pokImg",
      src: imgUrl,
      alt: "Card image cap",
    },
    {
      mouseenter: (event) => {
        onMouseEnterImg(event, backImgUrl);
      },
      mouseleave: (event) => {
        onMouseLeaveImg(event, imgUrl);
      },
    }
  );

  // Card types - first
  ////////////////////////
  let typesArray = [];
  types.forEach((type) => {
    typesArray.push(
      createElement("p", [`Type: ${type}`], ["card-text"], {
        type: "button",
        style: "margin-left:4px",
      })
    );
  });

  let title = createElement(
    "h5",
    [name.charAt(0).toUpperCase() + name.slice(1)],
    ["card-title"]
  );

  let typesDiv = createElement("div", [title, ...typesArray], ["card-body"]);

  // Card info - second
  ////////////////////////
  let li1 = createElement("li", [`Weight: ${Wieght} Kg`], ["list-group-item"]);
  let li2 = createElement("li", [`Height: ${Hieght} m`], ["list-group-item"]);
  let listInfo = createElement(
    "ul",
    [li1, li2],
    ["list-group", "list-group-flush"]
  );

  // Card ability - third
  ////////////////////////////
  let abilityArray = [];
  abilities.forEach((ability) => {
    abilityArray.push(
      createElement("p", [`ability: ${ability}`], ["card-text"])
    );
  });
  let abilitiesDiv = createElement("div", [...abilityArray], ["card-body"]);

  // Main div
  //////////////////////
  let mainDiv = createElement(
    "div",
    [img, typesDiv, listInfo, abilitiesDiv],
    ["card", "mt-5", "mb-5"],
    {
      style: "width: 18rem; margin: auto",
      id: "liveCard",
    }
  );

  document.querySelector("body").append(mainDiv);
}

function createTypeList(pokimonNames) {
  let modalBody = document.querySelector("#modalBody");
  modalBody.innerHTML = "";
  let pokimonsArray = [];
  pokimonNames.forEach((pokimon) => {
    pokimonsArray.push(
      createElement("li", [pokimon], [], {
        style: "cursor:pointer",
        "data-dismiss": "modal",
      })
    );
  });
  let typesUl = createElement("ul", [...pokimonsArray]);
  modalBody.append(typesUl);
}

function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  const myElement = document.createElement(tagName);

  children.map((child) => {
    myElement.append(child);
    return child;
  });

  classes.map((cls) => {
    myElement.classList.add(cls);
    return cls;
  });

  Object.entries(attributes).map(([attr, value]) => {
    myElement.setAttribute(attr, value);
    return attr;
  });

  Object.entries(eventListeners).map(([listener, handler]) => {
    myElement.addEventListener(listener, handler, true);
    return [listener, handler];
  });

  return myElement;
}
