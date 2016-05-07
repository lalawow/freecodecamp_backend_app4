var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })
 
var app = express()
 
app.post('/', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
})

app.listen(3000);