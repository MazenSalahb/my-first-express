const express = require("express");
const bcrypt = require("bcrypt");
// import { User } from "../models/user.js";
const User = require("../models/user.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const fineUser = await User.findOne({ email });
    if (fineUser) {
      res.json({
        status: "user exists!",
      });
    } else {
      const newUser = new User({
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      res.json({ status: "success", newUser });
    }
  } catch (e) {
    res.json({
      status: `faield ${e}`,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      res.json({
        status: "user not exists!",
      });
    } else {
      const passwordMatch = await bcrypt.compare(password, findUser.password);
      if (passwordMatch) {
        res.json({ status: "success" });
      } else {
        res.json({
          status: "user not exists!",
        });
      }
    }
  } catch (e) {
    res.json({
      status: `faield ${e}`,
    });
  }
});

module.exports = router;
