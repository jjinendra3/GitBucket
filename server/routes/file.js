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
let response=null;
var datetime =currentdate.getDay() + "/" + currentdate.getMonth() 
+ "/" + currentdate.getFullYear() + " @ " 
+ currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

let FinalObj = {
  repoid: null,
  datetime: null,
  files:[{
    filename:null,
    filstr:[{
      line:null,
      oldline:null,
      newline:null
    }]
  }]
};


const myarray=[];
let filly=[];
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

async function comparer(filename,mainarr1,mainarr2){
  let good = [];
  
  console.log(9);
  let i = 0;
  let j = 0;
  // console.log(mainarr1.length,mainarr2.length);
  while (i < mainarr1.length && j < mainarr2.length) {
    // console.log(mainarr1[i],mainarr2[j]);
    if (mainarr1[i] !== mainarr2[j]) {
      good.push({
        line: i,
        oldline: mainarr2[j],
        newline: mainarr1[i],
      });
    }
    i++;
    j++;
  }
  
  console.log(10);
  while (i < mainarr1.length) {
    good.push({
      line: i,
      oldline: "",
      newline: mainarr1[i],
    });
    i++;
  }
  
  console.log(11);
  while (j < mainarr2.length) {
    good.push({
      line: j,
      oldline: mainarr2[j],
      newline: "",
    });
    j++;
  }
  
  console.log(12);
  filly.push({
    filename: filename,
    filestr: [...good],
  });
  myarray.push({name:1});
  console.log(13);
  console.log(myarray,'supsup')
}

//FINALLY THIS IS WORKING AS IT SHOULD DONT TOUCH THE ASYNC AWAIT OR ANYTHING LIKE THIS ALL THE CHANGES MUST BE DONE ONLY IN COMPARER IF NEEDED
async function readLines(filePath) {
    try {
        const data = await fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' });
        const lines = await data.split('\n');
        return lines;
    } catch (error) {
        console.error('Error reading file:', error.message);
        return [];
    }
}
async function readCompare(oldPath, newPath) {
 
console.log(6);
const mainarr1=await readLines(oldPath);
  console.log(7);
  let mainarr2=[];
  if (fs.existsSync(newPath)) {
    //fourth step
    mainarr2= await readLines(newPath);
  }
  console.log(mainarr1,mainarr2);
  console.log(8);
  await comparer(oldPath.slice(7),mainarr1,mainarr2);
  
}




async function createDirectory(username, reponame, files) {
  //third step
  const directoryPath = `C:/Users/asus/Desktop/repositorytest/${username}/${reponame}`;
  
  console.log(3);
  try {
    if (await !fs.existsSync(directoryPath)) {
      await fs.mkdirSync(directoryPath, { recursive: true });
      console.log("Directory is created.");
    } else {
      console.log("Directory already exists.");
    }
    
    console.log(4);
    await files.forEach(async (file) => {
      try {
        let oldPath = `./temp/${file.originalname}`;
        let newPath = directoryPath + `/${file.originalname}`;
        
    console.log(5);
        await readCompare(oldPath, newPath);
        if(await fs.existsSync(newPath)){
          await fs.unlinkSync(newPath);
        }
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
  //second step
  try {
    console.log(1);
    const response = await Repo.findById(new ObjectId(id));
    const user = await Users.findById(new ObjectId(response.userid));
    console.log(user.username, response.name);
   
    console.log(2);
    await createDirectory(user.username, response.name, ss);
  } catch (error) {
    console.error(error);
  }
};



app.post("/upload", upload.array("files"), async(req, res) => {
  //first step
  try {
    FinalObj.repoid=req.body.repoid;
    FinalObj.datetime=currentdate;
    console.log(0);
    await getUserDetails(req.body.repoid, req.files);
    console.log(14);
    console.log('console',filly);
    FinalObj.files=[...filly];
    console.log('heehaw',FinalObj,myarray);
    const resp=await Commits.create(FinalObj);
    res.status(200).json({ response:resp,message: "Files uploaded successfully" });
    // return;
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = app;