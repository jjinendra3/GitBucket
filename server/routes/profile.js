const express = require("express");
const app = express.Router();
const CheckUser = require("../middleware/CheckUser");
const User=require('../models/Users')
const ObjectId = require("mongoose").Types.ObjectId;
app.post("/readme", async (req, res) => {
  // if (!req.checker) {
  //   return res.send("Invalid JWT Token");
  // }
  try {
    const { userId, readme } = req.body;
    const user = await User.findById(new ObjectId(userId));
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.readme = readme;
    await user.save();
    return res.send("Done");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }

});

module.exports = app;
