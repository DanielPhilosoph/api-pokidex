const express = require("express");
const fs = require("fs");
const router = express.Router();

router.post("/info", (req, res, next) => {
  res.json({ username: req.headers.username });
});

module.exports = router;
