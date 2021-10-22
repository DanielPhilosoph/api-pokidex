function errorMiddleware(err, req, res, next) {
  if (err === 404) {
    res.status(404).json({ error: "Could not find pokemon!" });
    next();
  } else if (err === 403) {
    res.status(403).json({
      error:
        "Relesed an uncaught pokemon or catching an already caught pokemon",
    });
    next();
  } else if (err === 401) {
    res.status(401).json({
      error: "username header is missing",
    });
    next();
  }
}

module.exports = errorMiddleware;
