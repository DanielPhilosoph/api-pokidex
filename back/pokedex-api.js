const express = require("express");
const pokemonRouter = require("./routers/pokemonRouter.js");
const userMiddleware = require("./middleware/userHandler.js");
const errorMiddleware = require("./middleware/errorHandler");
const userRouter = require("./routers/userRouter");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(userMiddleware);
app.use("/", userRouter);
app.use("/pokemon", pokemonRouter);

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "*");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});

app.use(errorMiddleware);
app.use(function (req, res, next) {
  res
    .status(500)
    .json({ error: "server error", look_at: "URL, method, headers" });
});
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
