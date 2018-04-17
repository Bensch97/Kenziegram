const express = require('express');
const multer = require('multer');
const os = require('os');
const fs = require('fs');
const upload = multer({ dest: 'public/uploads/' })
const port = 3000;
const app = express();

const uploaded_files = [];

app.use(express.static('./public'));
app.use(express.static('./public/uploads'));


app.get("/", (req, res) => {
    const path = './public/uploads/';
    fs.readdir(path, function (err, items) {
        console.log(items);
        // uploaded_files.reverse();
        let image=''
        items.forEach(element => {
            image += `<img src="${element}">
            <br>`
        })
        res.send(`<body><h1>Welcome to Kenziegram!</h1>
        <form action="/uploads" method="post" enctype="multipart/form-data">
            <input type="file" name="myFile" id="fileToUpload">
            <input type="submit" value="Upload Image" name="submit">
         </form> 
        
       ${image}
     </body>
`)})})

app.post('/uploads/', upload.single('myFile'), function (req, res, next) {
    console.log("Uploaded: " + req);
    // uploaded_files.push(req.file.filename);
    //var uploadedPicture = uploaded_files[uploaded_files.length - 1]
    console.log(uploaded_files);
    res.end(`<h1>You uploaded a photo</h1> <img src=${req.file.filename}>
    <button  type="button" onclick="location.href = 'http://localhost:3000/';"> Go Back </button> `);
})



app.listen(port)