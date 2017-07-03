'use strict';
module.exports = function(app) {
  var cardsList = require('../controllers/cardController');


  // todoList Routes
  app.route('/cards')
    .get(cardsList.list_all_games)
    .post(cardsList.create_a_game);

};
