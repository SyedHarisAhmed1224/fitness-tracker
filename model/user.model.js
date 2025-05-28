const mongoose = require('mongoose');
const db = require('../config/db');
const bcrypt = require("bcrypt");

const {Schema} = mongoose;
const userSchema = new Schema({
    name:{ type:String,
        lowercase:true,
        required:true,
        unique:true},
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    security:{
        type:String,
        required:true,
    },
    streak: { 
        type: Number,
         default: 0 
        },
    lastLogin: {
         type: Date
         },
    bestStreak: { 
        type: Number,
         default: 0 
        },
    quiz1: {
      type: Number,
      default: 0
    },
    quiz2: {
      type: Number,
      default: 0
    },
    project: {
      type: Number,
      default: 0
    },
    finalScore: {
      type: Number,
      default: 0
    }
});




// userSchema.pre('save',async function () {
//     try{
//         var user = this;
//         const salt = await(bcrypt.genSalt(10));
//         const hashpass = await bcrypt.hash(user.password,salt);
//         user.password = hashpass;
//     }catch (error){
//         throw error;
//     }
    
// });




userSchema.pre('save', async function () {
    try {
      // Only hash the password if it was modified or is new
      if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashpass = await bcrypt.hash(this.password, salt);
        this.password = hashpass;
        
    // Automatically calculate finalScore
    this.finalScore = (this.quiz1 || 0) + (this.quiz2 || 0) + (this.project || 0);
      }
    } catch (error) {
      throw error;
    }
  });
  
userSchema.methods.comparePassword = async function(usesrPassword){
    try{
        const isMatch = await bcrypt.compare(usesrPassword,this.password);
        return isMatch;
    }catch(error){
        throw error;
    }
}
userSchema.methods.compareSecurityAnswer = function (providedAnswer) {
    try {
      // Check if 'security' exists on the user document
      if (!this.security) {
        throw new Error('Security answer is not set for this user.');
      }
  
      // Compare the provided answer with the stored answer
      const isMatch = this.security === providedAnswer;
      return isMatch;
    } catch (error) {
      console.error('Error comparing security answer:', error);
      throw new Error('Failed to verify security answer.');
    }
  };
  

const UserModel = db.model('user',userSchema);

module.exports = UserModel;
