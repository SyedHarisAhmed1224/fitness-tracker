const mongoose = require('mongoose');
const db = require('../config/db');

const question1Schema = new mongoose.Schema({
    question:{ type:String},
    options: [String],
    answer: {type: Number}
  });

  const Question1 = db.model('Question1', question1Schema);

  module.exports = Question1;