var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080,
  mongoose = require('mongoose'),
  Task = require('./api/models/cardModel'),
  bodyParser = require('body-parser'),
  path = require('path');
  require('newrelic');
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://AakashGC:qwerty123@ds147072.mlab.com:47072/cardsgame');

app.use(express.static(__dirname + '/build-prod/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/build-prod'));
app.set('view engine', 'html');


var routes = require('./api/routes/cardRoutes');
var htmlRoutes = require('./api/routes/htmlRoutes');
routes(app);
htmlRoutes(app);

app.listen(port);


console.log('card Game RESTful API server started on: ' + port);
