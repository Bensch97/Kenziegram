const express = require('express');
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const pug = require('pug')
const upload = multer({ dest: 'public/uploads/' })
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('./public'));
app.use(express.static('./public/uploads'));
app.use(express.static('./views'))
app.set('view engine', 'pug')


app.get("/", (req, res) => {
    const path = './public/uploads/';
    fs.readdir(path, function (err, items) {
        console.log(items);
        let image=''
        res.render('app', {header: "Welcome to Kenziegram", imgArray: items})
})})

app.post('/uploads/', upload.single('myFile'), function (req, res, next) {
    console.log("Uploaded: " + req);
    // uploaded_files.push(req.file.filename);
    //var uploadedPicture = uploaded_files[uploaded_files.length - 1]
    console.log(uploaded_files);
    res.render('upload', {header: "You uploaded a photo", imageSRC: req.file.filename})
})



app.listen(port)