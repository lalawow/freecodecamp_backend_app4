'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var passport = require('passport');
var session = require('express-session');
var multer  = require('multer')
//var mongoose = require('mongoose');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

//mongoose.connect(process.env.MONGO_URI);

//app.use(multer({ dest: './uploads/'}))
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//for freecodecamp backend porject4:File Metadata Microservice
var upload = multer({ dest: './uploads/' })
app.post('/', upload.single('upload'), function (req, res, next) {
  console.log("a file was uploaded!")
  // req.file is the `avatar` file 
  var file= req.file
  var result = {
  	filesize: file.size
  }
  // req.body will hold the text fields, if there were any 
  res.send(JSON.stringify(result))
})

routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});