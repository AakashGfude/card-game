'use strict';
module.exports = function(app) {
  var cardsList = require('../controllers/cardController');

  // to enable CORS request
  app.all('/*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    next();
  })

  // todoList Routes
  app.route('/cards')
    .get(cardsList.list_all_games)
    .post(cardsList.create_a_game)
    .put(cardsList.edit_a_game);

  app.route('/marvel')
    .get(cardsList.call_marvel);

};
