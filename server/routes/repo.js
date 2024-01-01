const express = require("express");
const Repo = require("../models/Repo");
const User = require("../models/Users");
const app = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

app.post("/create", async (req, res) => {
  try {
    let obj = {
      name: req.body.name,
      type: req.body.type,
      userid: req.body.userid,
      commits: ["init"],
    };
    console.log(obj)
    let user = await User.findById(new ObjectId(obj.userid));

    if (!user) {
      return res.status(404).send("User not found");
    }

    let repo = await Repo.create(obj);
    console.log(repo);
    user.repos.push({id:repo._id,name:req.body.name,type:req.body.type});
    await user.save();

    console.log(user, repo);
    return res.send({repo});
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});
app.get('/getrepo/:id',async(req,res)=>{
try {
  const repo=await Repo.findById(new ObjectId(req.params.id));
  return res.send({repo});
} catch (error) {
  return res.send("error");
}
})
module.exports = app;
