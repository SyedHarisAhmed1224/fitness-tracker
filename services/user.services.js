

const UserModel = require('../model/user.model');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const crypto = require("crypto");





class UserService{

 
  static async registerUser(userData) {
    try {
      
      const { name,email, password , security } = userData;

      if ( !name || !email || !password || !security) {
        throw new Error('Email and password are required');
      }

      
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      

      
      const newUser = new UserModel({ name, email, password ,security }); 
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Error creating user');
    }
  }

 






  

  static async getUserData(email) {
    const UserData = await UserModel.findOne({email})
    return UserData;
   }

   static async getUserName(_id) {
    const UserData = await UserModel.findById({_id})
    return UserData;
   }



   static async updatePassword(_id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await UserModel.findByIdAndUpdate(_id, { password: hashedPassword }, { new: true });
  }
   static async updateName(email, newName) {
  return await UserModel.findOneAndUpdate(
     { email: email },
    { name: newName },
    { new: true }
  );
}

 
 
 
  static async getUserByEmail(email){
      try{
          return await UserModel.findOne({email});
      }catch(err){
          console.log(err);
      }
  }
  static async checkUser(email){
      try {
          return await UserModel.findOne({email});
      } catch (error) {
          throw error;
      }
  }
   static async checkUserbyid(_id){
      try {
          return await UserModel.findById({_id});
      } catch (error) {
          throw error;
      }
  }
  static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
      return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }


  static async deleteUserData(_id){
    const deleted = await UserModel.findByIdAndDelete({_id:_id})
    return deleted;
  }

}