const jwt = require("jsonwebtoken");
require("dotenv").config();

const token_key = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const decoded = jwt.verify(token, token_key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  return next();
};

module.exports = verifyToken;
