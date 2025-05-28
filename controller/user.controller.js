// const UserService = require("../services/user.services");

// exports.register = async(req,res,next)=>{
//     try{
//         const {email,password}= req.body;
        
//         const successRes = await UserService.registerUser(email,password);
//         res.json({status:true ,success:"User Registered Successfully"});

//     }catch(error){
//         throw error
//     }
// }
const UserService = require('../services/user.services');
const QuestionService = require('../services/question.services');


exports.register = async (req, res, next) => {
  try {
    const { name, email, password, security } = req.body;

    if (!name ||!email || !password  || !security) {
      return res.status(400).send({ error: 'Name ,Email and password are required' });
    }

    const user = await UserService.registerUser({ name, email, password, security });

    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.add = async (req, res, next) => {
  try {
    const { question, options} = req.body;

   

    const que = await QuestionService.addQuestion({ question,options});

    res.status(201).send({ message: 'question added successfully', que });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
exports.getAll = async (req, res, next) => {
  try {
    const questions = await QuestionService.getQuestions();
    res.status(200).send({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


// module.exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = UserService.checkUser(email); 

//     if(!user){
//       throw new Error('User dont exist');
//     }
//     // const isMatch = user.comparePassword(password);

//     // if(isMatch === false){
//     //   throw new Error('Password inValid');
//     // }

//     let tokenData = {_id:user._id,email:user.email};

//     const token = await UserService.generateToken(tokenData,"secretKey","1d ")
//     res.status(200).json({status:true,token:token})

//     // if (!email || !password) {
//     //   return res.status(400).send({ error: 'Email and password are required' });
//     // }

//     // const user = await UserService.registerUser({ email, password });

//     // res.status(201).send({ message: 'User registered successfully', user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// }; 

exports.login = async (req, res, next) => {
  try {
      const { email, password } = req.body;
      if (!email || !password) {
          throw new Error('Parameter are not correct');
      }
      let user = await UserService.checkUser(email);
      if (!user) {
          throw new Error('User does not exist');
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (isPasswordCorrect === false) {
          throw new Error(`Username or Password does not match`);
      }


      user.lastLogin = new Date();
      await user.save();
      // Creating Token
      let tokenData;
      tokenData = { _id: user._id, email: user.email, name: user.name , streak: user.streak , bestStreak : user.bestStreak
        
       };
  
      const token = await UserService.generateAccessToken(tokenData,"secret","1h")
      res.status(200).json({ status: true, success: "sendData", token: token });
  } catch (error) {
      console.log(error, 'err---->');
      next(error);
  }
};


exports.getUserData = async (req, res ,next) => {
  try {
    const {name, email} = req.body;


    const user = await UserService.getUserData({ name, email});
    res.json({status:true,success:user});

  res.status(201).send({ message: 'User Found heheh', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.getUserData1 = async (req, res ,next) => {
  try {
    const {_id} = req.body;


    const user = await UserService.getUserName({_id});
    res.json({status:true,success:user});

  res.status(201).send({ message: 'User Found heheh', user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
// exports.questions = async (req, res ,next) => {
//   try {
//     const {question,options} = req.body;


//     const que = await QuestionService.questions({ question,options});
//     res.json({status:true,success:que});

//   res.status(201).send({ message: 'Question Found heheh', que });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };



exports.deleteUserData =  async (req,res,next)=>{
  try {
      const { _id } = req.body;
      let deletedData = await UserService.deleteUserData(_id);
      res.json({status: true,success:deletedData});
  } catch (error) {
      console.log(error, 'err---->');
      next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email, security, newPassword } = req.body;

    // Validate request parameters
    if (!email || !security || !newPassword) {
      return res.status(400).json({ error: 'Email, security answer, and new password are required' });
    }

    // Check if the user exists
    const user = await UserService.checkUser(email);
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    // Verify the security answer
    const isAnswerCorrect = await user.compareSecurityAnswer(security);
    if (!isAnswerCorrect) {
      return res.status(400).json({ error: 'Incorrect security answer' });
    }

    // Update the user's password
    const updatedUser = await UserService.updatePassword(user._id, newPassword);
    res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


exports.newName = async (req, res, next) => {
  try {
    const { email, newName } = req.body;

    // Validate request parameters
    if (!newName) {
      return res.status(400).json({ error: ' new name is required' });
    }

    // Check if the user exists
     const user = await UserService.checkUser(email);
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }

    //  // Check if the new name already exists (excluding the current user)
    // const existingUser = await UserModel.findOne({ name: newName, _id: { $ne: _id } });
    // if (existingUser) {
    //   return res.status(409).json({ error: 'Username already taken' });
    // }

    // Update the user's password
    const updatedUser = await UserService.updateName(email, newName);
    res.status(200).json({ message: 'Name updated successfully', user: updatedUser })

  } catch (error) {
    console.error(error);
    next(error);
  }
};








exports.updateStreak = async (req, res, next) => {
  try {
    // Assuming you have middleware to set req.
    const {email}= req.body;
    const data = await UserService.updateStreak(email);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating streak:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Controller to get current streak (without updating)
exports.getStreak = async (req, res) => {
  try {
    const {_id} = req.body;
    const user = await UserService.updateStreak(_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      streak: user.streak || 0,
      bestStreak: user.bestStreak || 0,
    });
  } catch (error) {
    console.error('Error fetching streak:', error.message);
    res.status(500).json({ message: error.message });
  }
};



exports.getAndUpdateStreak = async (req, res, next) => {
  try {
    const {_id} = req.body;
    const data = await UserService.updateStreak(_id); // Also updates lastLogin
    res.status(200).json(data);
  } catch (error) {
    console.error('Error updating streak:', error.message);
    res.status(500).json({ message: error.message });
  }
};



exports.saveScore = async (req, res) => {
  try {
    const { _id, quiz1 } = req.body;

    await UserService.saveScore(_id, quiz1);
    res.status(200).send('Score saved');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving score');
  }
};

const nodemailer = require("nodemailer");
const UserModel = require('../model/user.model');


// // Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     // user: process.env.EMAIL,
//     // pass: process.env.EMAIL_PASSWORD,
//     user: "ai2019good@gmail.com",
//     pass: "ifaa hvcy dwig fdby",
//   },
// });

// // ✅ Generate and Send OTP
// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

//     // Save OTP to Database
//     let user = await UserService.findOne({ email });
//     if (!user) {
//       user = new UserService({ email, otp, otpExpires });
//     } else {
//       user.otp = otp;
//       user.otpExpires = otpExpires;
//     }
//     await user.save();

//     // Send OTP via Email
//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Your OTP Code",
//       text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//     });

//     res.json({ status: "success", message: "OTP sent successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error sending OTP" });
//   }
// };

// // ✅ Verify OTP
// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email, otp });

//     if (!user) {
//       return res.status(400).json({ status: "error", message: "Invalid OTP" });
//     }

//     if (user.otpExpires < new Date()) {
//       return res.status(400).json({ status: "error", message: "OTP expired" });
//     }

//     // Mark user as verified
//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.json({ status: "success", message: "Email verified successfully" });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: "Error verifying OTP" });
//   }
// };




