const mongoose = require('mongoose');
const db = require('../config/db');

const truefalseSchema = new mongoose.Schema({
  question: { 
    type: String, 
    required: true 
  },
  answer: { 
    type: Boolean, // Use Boolean for true/false answers
    required: true 
  }
});

const TrueFalseQuestion = db.model('TrueFalse', truefalseSchema);

module.exports = TrueFalseQuestion;
