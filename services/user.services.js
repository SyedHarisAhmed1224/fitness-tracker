
// const UserModel = require('../model/user.model');
// const jwt = require('jsonwebtoken');

// class UserService{
//     static async registerUser(email,password){
//         try{
//             const createUser = new UserModel({email,password});
//             return await createUser.save();
//         }catch(err){
//             throw err;
//         }
//     }
   
// }






const UserModel = require('../model/user.model');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const optGenerator = require("otp-generator");
const crypto = require("crypto");
const key ="test123";
const emailServices = require('../services/emailServices');



// class UserService {
//   /**
//    * Registers a new user.
//    * @param {Object} userData - The data for the new user.
//    * @returns {Object} The newly created user.
//    * 
//    * 
//    */

 



//   static async getUserData(_id) {
//    const UserData = await UserModel.findOne({_id})
//    return UserData;
//   }






//   /**
//    * Checks if a user exists by email.
//    * @param {string} email - The email to check.
//    * @returns {Object|null} The found user or null if not found.
//    */
//   static async checkUser(email) {
//     try {
//       if (!email) {
//         throw new Error('Email is required');
//       }
//       return await UserModel.findOne({ email }); // Correct usage of `findOne`
//     } catch (error) {
//       throw new Error(error.message || 'Error checking user');
//     }
//   }

//   static async comparePassword(password) {
//     try {
//       if (!password) {
//         throw new Error('Password is required');
//       }
//       return await UserModel.findOne({ password }); // Correct usage of `findOne`
//     } catch (error) {
//       throw new Error(error.message || 'Error checking user');
//     }
//   }

//   /**
//    * Generates a JWT token.
//    * @param {Object} tokenData - The payload data for the token.
//    * @param {string} secretKey - The secret key to sign the token.
//    * @param {string|number} jwtExpire - Expiration time for the token.
//    * @returns {string} The signed JWT token.
//    */
//   static async generateToken(tokenData, secretKey, jwtExpire) {
//     try {
//       if (!tokenData || !secretKey || !jwtExpire) {
//         throw new Error('Token data, secret key, and expiration time are required');
//       }
//       return jwt.sign(tokenData, secretKey, { expiresIn: "1d" });
//     } catch (error) {
//       throw new Error(error.message || 'Error generating token');
//     }
//   }
// }

// module.exports = UserService;



class UserService{

 
  static async registerUser(userData) {
    try {
      // Ensure `userData` is correctly structured
      const { name,email, password , security } = userData;

      if ( !name || !email || !password || !security) {
        throw new Error('Email and password are required');
      }

      // Check if the email is already registered
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }

      

      // Create and save the new user
      const newUser = new UserModel({ name, email, password ,security }); // Ensure fields match schema
      await newUser.save();
      return newUser;
    } catch (error) {
      throw new Error(error.message || 'Error creating user');
    }
  }

 






  
 
  // static async registerUser(name,email,password){
  //     try{
  //          //   console.log("-----Email --- Password-----",name,email,password);
              
  //             const createUser = new UserModel({name, email, password});
  //             return await createUser.save();
  //     }catch(err){
  //         throw err;
  //     }
  // }
  

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

  
  static async  sendOTP(params , callback){
  const otp = optGenerator.generate(
    4,{
      digits:true,
      upperCaseAlphabets:false,
      specialChars:false,
      lowerCaseAlphabets:false,
    }
  )
  const ttl=1 * 60 * 1000;
  const expires = Date.now() + ttl;
   const data =`${params.email}.${otp}.${expires}`;
  //const data =`${params.phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256",key).update(data).digest("hex");
  const fullHash =`${hash}.${expires}`;

  var otpMessage = `Dear User,  

Thank you for choosing us as your learning partner. Your **one-time password (OTP) is:   ${otp}  🔑  

⚠️ **Important:** Please do *not* share this OTP with anyone. It is valid for a limited time only. ⏳  

Happy Learning! 📚✨`;
  var model = {
    email: params.email,
    subject: "🔐 CodeMagic Account Registration - ",
    body: otpMessage
  };


  emailServices.sendEmail(model, (error ,result)=>{
    if(error){
      return callback(error);
    }
    return callback(null, fullHash);
  });

 // return callback(null, fullHash);
}
static async verifyOtp(params ,callback){

  let[hashValue , expires] = params.hash.split('.');

  let now = Date.now();

  if (now > parseInt(expires)) return callback("OTP expired");
  let data = `${params.email}.${params.otp}.${expires}`;
 // let data = `${params.phone}.${params.otp}.${expires}`;
  let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest("hex");

  if(newCalculatedHash === hashValue){
    return callback(null , "Success");
  }
  return callback("Invalid OTP");
}






// static async updateStreak(_id) {
//   const user = await UserModel.findById({_id});
//   if (!user) throw new Error('User not found');

//   const now = new Date();
//   let newStreak = 1;

//   if (user.lastLogin) {
//     const diffInMinutes = (now - user.lastLogin) / (1000 * 60);
//     newStreak = diffInMinutes <= 2 ? user.streak + 1 : 1;
//   }

//   const newBestStreak = Math.max(newStreak, user.bestStreak || 0);

//   const updatedUser = await UserModel.findByIdAndUpdate(
//     _id,
//     {
//       streak: newStreak,
//       bestStreak: newBestStreak,
//       lastLogin: now
//     },
//     { new: true }
//   );

//   return {
//     streak: updatedUser.streak,
//     bestStreak: updatedUser.bestStreak,
//   };
// }






static async updateStreak(_id) {
  const user = await UserModel.findById(_id);
  if (!user) throw new Error('User not found');

  const now = new Date();

  // Already updated within the same minute? Don't increase
  const diffInMinutes = (now - user.lastLogin) / (1000 * 60);
  let newStreak = user.streak;

  if (diffInMinutes >= 1 && diffInMinutes <= 2) {
    newStreak += 1;
  } else if (diffInMinutes > 2) {
    newStreak = 1; // Reset streak
  } else {
    // Less than a minute passed since last update, do nothing
    return {
      streak: user.streak,
      bestStreak: user.bestStreak,
    };
  }

  const newBestStreak = Math.max(newStreak, user.bestStreak || 0);

  const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    {
      streak: newStreak,
      bestStreak: newBestStreak,
      lastLogin: now
    },
    { new: true }
  );

  return {
    streak: updatedUser.streak,
    bestStreak: updatedUser.bestStreak,
  };
}


static async saveScore  (_id, quiz1)  {
  const newScore = new UserModel({
    _id,
    quiz1,
  });

  return await newScore.save();
};


}




module.exports = UserService;




// module.exports = UserService;   
// const UserModel = require('../model/user.model');

// module.exports.registerUser = async (userData) => {
//   try {
//     // Ensure `userData` is correctly structured
//     const { email, password } = userData;

//     if (!email || !password) {
//       throw new Error('Email and password are required');
//     }

//     const newUser = new UserModel({ email, password }); // Pass fields as expected by schema
//     await newUser.save();
//     return newUser;
//   } catch (error) {
//     throw new Error(error.message || 'Error creating user');
//   }

//   static async checkuser(email){
//     try{
//       return await UserModel({email});
//     }catch(error){
//       throw error;
//     }
//   }


//   static async generateToken(tokenData,secretKey,jwt_expire){
//     return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
//   }
// };
