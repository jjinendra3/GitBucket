const express = require("express");
const app = express.Router();
const markdownit =require('markdown-it')
const CheckUser=require('../middleware/CheckUser');
const md = markdownit()
// CheckUser
app.post("/readme", async (req, res) => {
    // if (!req.checker) {
    //   return res.send("Invalid JWT Token");
    // }
    try {
      const { readme } = req.body;
      const response = await md.render(readme);
      try {
        return res.send({readme:response});
      } catch (error) {
        return res.send("Error");
      }
    } catch (error) {
      return res.send("error");
    }
  });

module.exports = app;
