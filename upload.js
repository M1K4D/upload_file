var express = require("express");
var multer = require("multer");
var fs = require("fs");

var app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/upload", uploadStorage.single("file"), (req, res) => {
  console.log(req.file);
  return res.send("Single file");
});

app.get("/photos/:id", (req, res) => {
  var filename = req.params.id;
  return res.sendFile(__dirname + `/uploads/${filename}.jpg`)
});

app.listen(3000, function () {
  console.log("App running on port 3000");
});
