'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var cardSchema = new Schema({
  username: {
    type: String,
    Required: 'Kindly enter the name of the person'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  time: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Cards', cardSchema);
