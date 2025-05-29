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





