const express = require("express");
const fs = require("fs");
const app = express.Router();
const multer = require("multer");
const Repo = require("../models/Repo");
const Commits = require("../models/Commits");
const Users = require("../models/Users");
const ObjectId = require("mongoose").Types.ObjectId;
const readline = require("readline");
var currentdate = new Date();
const archiver = require("archiver");
const response = [];
var datetime =
  currentdate.getDay() +
  "/" +
  currentdate.getMonth() +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const FinalObj = {
      repoid: null,
      datetime: null,
      files: [],
    };
    FinalObj.repoid = req.body.repoid;
    FinalObj.datetime = currentdate;
    const response = await Repo.findById(new ObjectId(req.body.repoid));
    const user = await Users.findById(new ObjectId(response.userid));
    const directoryPath = `C:/Users/asus/Desktop/repositorytest/${user.username}/${response.name}`;
    let flag = 0;
    if (await !fs.existsSync(directoryPath)) {
      await fs.mkdirSync(directoryPath, { recursive: true });
      flag = 1;
      // Directory is created.
    }
    const array = [];
    let data2 = [];
    let i;

    for (i in req.files) {
      const filer = await fs.readFileSync(
        `./temp/${req.files[i].originalname}`,
        "utf-8",
      );
      const data = filer.split("\r\n");
      if (flag == 0) {
        const filer2 = await fs.readFileSync(
          directoryPath + `/${req.files[i].originalname}`,
          "utf-8",
        );
        data2 = filer2.split("\r\n");
      }
      const hello = {
        filename: req.files[i].originalname,
        filestr: [],
      };
      let j = 0,
        k = 0;
      while (k < data.length && j < data2.length) {
        if (data[k] !== data2[j]) {
          hello.filestr.push({
            line: k,
            oldline: data2[j],
            newline: data[k],
          });
        }
        k++;
        j++;
      }

      // If data is longer, add the remaining lines
      while (k < data.length) {
        hello.filestr.push({
          line: k,
          oldline: "",
          newline: data[k],
        });
        i++;
      }

      // If data2 is longer, add the remaining lines
      while (j < data2.length) {
        hello.filestr.push({
          line: j,
          oldline: data2[j],
          newline: "",
        });
        j++;
      }
      FinalObj.files.push(hello);
      if (flag == 0) {
        fs.unlinkSync(directoryPath + `/${req.files[i].originalname}`);
      }
      fs.renameSync(
        `./temp/${req.files[i].originalname}`,
        directoryPath + `/${req.files[i].originalname}`,
      );
    }
    //insert this commit in repo array
    //change the no of files in repo array
    const submit = await Commits.create(FinalObj);
    res.status(200).json({ id: submit, message: "Sucess!" });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/download-folder", async (req, res) => {
  const { username, reponame } = req.body;
  const folderPath = `C:/Users/asus/Desktop/repositorytest/${username}/${reponame}`;
  const zipFilePath = `C:/Users/asus/Desktop/repositorytest/${username}/${reponame}/${reponame}.zip`;
  const output = await fs.createWriteStream(zipFilePath);
  const archive = await archiver("zip", { zlib: { level: 9 } });
  output.on("close", () => {
    console.log(`Folder "${folderPath}" has been zipped to "${zipFilePath}"`);

    res.download(zipFilePath);
    fs.unlinkSync(zipFilePath);
    return;
  });

  archive.on("error", (err) => {
    throw err;
  });
  archive.pipe(output);
  archive.directory(folderPath, false);
  archive.finalize();
});

app.post("/deletefile", (req, res) => {
  const { username, reponame, filename } = req.body;
  fs.unlinkSync(
    `C:/Users/asus/Desktop/repositorytest/${username}/${reponame}/${filename}`,
  );
  res.send("Done");
});
module.exports = app;
