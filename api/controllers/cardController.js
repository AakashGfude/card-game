'use strict';
var mongoose = require('mongoose'),
  Task = mongoose.model('Cards');
var api = require('marvel-comics-api');


exports.list_all_games = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_a_game = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    var resObj = {
      status: 200,
      response: task
    }
    res.json(resObj);
  });
};

exports.edit_a_game = function(req,res) {
  Task.findById(req.body._id,function(err,task){
    task.time = req.body.time;
    task.save(function(err, task) {
      if (err)
        res.send(err);
      var resObj = {
        status: 200,
        response: task
      }
      res.json(resObj);
    });
  })

}

exports.call_marvel = function(req, res) {
  // fetch 50 Marvel characters
  api('characters?orderBy=modified', {
    publicKey: '9ec9bd8ca1f31c504076c047bafac705',
    privateKey: '657b1d20bc1439c03ad5e5b3f0f3bf215f39a418',
    timeout: 6000,
    query: {
      limit: 100
    }
  }, function (err, body) {
    if (err) throw err
    res.json(body.data.results);
  })
}
