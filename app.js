const express = require('express');
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const pug = require('pug')
const app = express();
const path = require("path")

const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads')

const upload = multer({ dest: UPLOAD_DIR })
const port = process.env.port || 3000;

app.use(express.static('./public'));
app.use(express.static('./views'))
app.use(express.json())
app.set('view engine', 'pug')

const image = []

app.post('/upload', upload.single('myFile'), function (req, res, next) {
    console.log(req.file)
    res.render('upload', {header: "You uploaded a photo", image: req.file})
})

app.get("/", (req, res) => {
    const path = './public/uploads/';
    fs.readdir(UPLOAD_DIR,  (err, items) => {
        res.render('app', {header: "Welcome to Kenziegram", images: items})
})})


app.post("/latest", function(req, res) {
    fs.readdir(UPLOAD_DIR, (err, images) => {
        const newImages = []
        let timestamp = req.body.after

        images.forEach(image => {
            const imagePath = path.join(UPLOAD_DIR, image)
            const modified = fs.statSync(imagePath).mtimeMs

            if(modified > req.body.after) {
                if (modified > timestamp) {
                    timestamp = modified
                }
                newImages.push(image)
            }
        })

        res.send({
            images: newImages,
            timestamp
        })
    })
})



app.listen(port)