const fs = require("fs");
function userMiddleware(req, res, next) {
  if (req.headers.username === undefined) {
    next(401);
  } else {
    try {
      let users = fs.readdirSync("./back/users");
      let index = users.indexOf(req.headers.username);
      if (index !== -1) {
        next();
        return;
      } else {
        throw 500;
      }
    } catch (error) {
      next(500);
    }
  }
}

module.exports = userMiddleware;
