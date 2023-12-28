const express = require("express");
const Repo = require("../models/Repo");
const User = require("../models/Users");
const app = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

app.post("/create", async (req, res) => {
  console.log(req.body);

  try {
    let obj = {
      name: "",
      type: true,
      userid: "",
      commits: ["init"],
    };

    let user = await User.findById(new ObjectId(obj.userid));

    if (!user) {
      return res.status(404).send("User not found");
    }

    let repo = await Repo.create(obj);

    user.repos.push(repo._id);
    await user.save();

    console.log(user, repo);
    return res.send("Successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});
module.exports = app;
