const express = require("express");
const fs = require("fs");
const app = express.Router();
const multer = require("multer");
const Repo = require("../models/Repo");
const Commits = require("../models/Commits");
const Users = require("../models/Users");
const ObjectId = require("mongoose").Types.ObjectId;
let destination = "";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function createDirectory(username, reponame, files) {
  const directoryPath = `C:/Users/asus/Desktop/repositorytest/${username}/${reponame}`;
  destination = directoryPath;
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log("Directory is created.");
    } else {
      console.log("Directory already exists.");
    }
    files.forEach(async (file) => {
      try {
        let oldPath = `./${file.originalname}`;
        let newPath = directoryPath + `/${file.originalname}`;
        console.log(directoryPath, oldPath, newPath);
        await fs.promises.rename(oldPath, newPath);
        console.log("File moved successfully.");
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function getUserDetails(id, ss) {
  try {
    const response = await Repo.findById(new ObjectId(id));
    const user = await Users.findById(new ObjectId(response.userid));
    console.log(user.username, response.name);
    createDirectory(user.username, response.name, ss);
  } catch (error) {
    console.error(error);
  }
}
//
app.post("/upload", upload.array("files"), (req, res) => {
  try {
    getUserDetails(req.body.repoid, req.files);
    res.status(200).json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;
