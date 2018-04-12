const express = require('express');
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const upload = multer({ dest: 'public/' })
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('./public'));

const path = './public/uploads';
app.get("/", (req, res) =>
    fs.readdir(path, function (err, items) {
        console.log(items);
        res.send(`<h1>Welcome to Kenziegram!</h1>`);
    })
)

app.post('http://localhost:3000', upload.single('myFile'), function (req, res, next) {
    // console.log("Uploaded: " + req.file.filename);
    // uploaded_files.push(req.file.filename);
    const path = './public/uploads';
    fs.readdir(path, function (err, items) {
        console.log(items);
        res.send(`<h1>Welcome to Kenziegram!</h1>`);
    });
    res.end("Uploaded file!");
})



app.listen(port);