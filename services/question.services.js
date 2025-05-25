
const QuestionModel = require('../model/question.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



class QuestionService{
  
    static async addQuestion(QueData) {
      try {
        
        const { question,options} = QueData;
  
        
  
        // Create and save the new user
        const newQuestion = new QuestionModel({ question,options}); // Ensure fields match schema
        await newQuestion.save();
        return newQuestion;
      } catch (error) {
        throw new Error(error.message || 'Error creating question');
      }
    }
 

    // const Question = require('../models/question'); // Assuming Question is your Mongoose model

// static async getQuestions { 
  
//     return await Question.find(); // Fetches all questions
 
// }


    static async questions(question) {
        const QueData = await QuestionModel.findOne({question});
        return QueData;
       }

       static  getQuestions = async () =>{
        return await QuestionModel.find();
       }
    
  
  }

  
// exports.getQuestions = async () => {
//   try {
//     return await QuestionModel.find(); // Fetches all questions
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

  
module.exports = QuestionService;