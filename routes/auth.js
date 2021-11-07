const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

require("dotenv").config();

const token_key = process.env.TOKEN_KEY;

const router = express.Router();

// Middlewares
// Parse JSON bodies (as sent by API clients)
router.use(express.urlencoded());
router.use(express.json());

router.post("/signup", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!(username && password && email)) {
      return res.status(400).json({ message: "All inputs are required." });
    }

    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res
        .status(409)
        .json({ message: "User already exists.Please login." });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      token_key,
      {
        expiresIn: "48h",
      }
    );

    return res.status(201).json({
      user: user,
      token: token,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({ message: "All inputs are required." });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User Doesn't Exist. Please signup." });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        token_key,
        {
          expiresIn: "48h",
        }
      );

      return res.status(200).json({
        user: user,
        token: token,
      });
    }

    return res.status(400).json({ message: "Invalid Credentials." });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
