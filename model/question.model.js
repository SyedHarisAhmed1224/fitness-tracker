const mongoose = require('mongoose');
const db = require('../config/db');

const questionSchema = new mongoose.Schema({
    question:{ type:String},
    options: [String],
    answer: {type:String}
  });

  const Question = db.model('Question', questionSchema);

  module.exports = Question;