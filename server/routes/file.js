const express = require("express");
const fs = require('fs');
const app = express.Router();
const multer = require('multer');
let destination="./";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

function mkdirr(req,res,next){
    try {
        if (!fs.existsSync('my-folder')) {
            fs.mkdirSync('my-folder');
            console.log("Directory is created.");
        } else {
            console.log("Directory already exists.");
        }
    } catch (err) {
        console.log(err);
    }
    
  next();
};

app.post('/upload',mkdirr,upload.array('files'),(req,res)=>{
    try {
        const files = req.files;
        files.forEach(file => {
          console.log(`Received file: ${file.originalname}, size: ${file.size} bytes`);
        });
        res.status(200).json('Files uploaded successfully' );
      } catch (error) {
        console.error('Error handling file upload:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


module.exports = app;