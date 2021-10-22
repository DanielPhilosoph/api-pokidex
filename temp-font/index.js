const axios = require("axios");
//const fetch = require("node-fetch");
async function handleClick() {
  const headersObj = {
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Content-Type": "application/json",
    username: "daniel",
  };
  try {
    const response = await axios.get("http://localhost:3000/pokemon", {
      headers: headersObj,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

handleClick();
