var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/cardModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://AakashGC:qwerty123@ds147072.mlab.com:47072/cardsgame');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/cardRoutes');
routes(app);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
