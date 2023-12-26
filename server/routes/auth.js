const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const uniqueness = require("../middleware/uniquecheck");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();

app.post("/signup", uniqueness, async (req, res) => {
  console.log(req.body);
  if (req.checker) {
    return res
      .status(401)
      .send("User with this email or username already exists!");
  } else {
    try {
      let obj = req.body;
      const hasher = await bcrypt.hash(
        obj.password,
        saltRounds,
        async function (err, hash) {
          if (err) {
            throw res.send("error");
          } else {
            obj.password = hash;
            let user = await User.create(obj);
          }
        }
      );
      return res.send("Sucessful");
    } catch (error) {
      return res.send("error");
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    let privateKey = process.env.YOUR_PRIVATE_KEY;
    const { id, pw } = req.body;
    let user_mail = await User.findOne({ email: id });
    let usernamer = await User.findOne({ username: id });
    if (user_mail === null && usernamer === null) {
      throw res.send({ s: false, error: "No Such User found!" });
    }
    let user_detail;
    if (user_mail) {
      user_detail = user_mail;
    } else {
      user_detail = usernamer;
    }
    bcrypt.compare(pw, user_detail.password, function (err, result) {
      if (err) {
        return res.send({ s: false, error: "Please Try again later!" });
      }
      if (!result) {
        return res.send({ s: false, error: "Credentials do not match!" });
      }
      let obj = {
        key: user_detail._id.toString(),
        name: user_detail.name,
        email: user_detail.email,
        username: user_detail.username,
        password: user_detail.password,
        linkedin: user_detail.linkedin,
        bio: user_detail.bio,
        portfolio: user_detail.portfolio,
        friends: user_detail.friends,
      };
      jwt.sign(obj.key, privateKey, function (err, token) {
        if (err) {
          return res.send({ s: false, error: "Please try Again later!" });
        }
        return res.send({ s: true, token, obj });
      });
    });
  } catch (error) {
    return error;
  }
});

module.exports = app;
