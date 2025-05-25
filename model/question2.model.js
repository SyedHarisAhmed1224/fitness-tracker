const mongoose = require('mongoose');
const db = require('../config/db');

const question2Schema = new mongoose.Schema({
    question:{ type:String},
    options: [String],
    answer: {type: Number}
  });

  const Question2 = db.model('Question2', question2Schema);

  module.exports = Question2;