const router = require("express").Router();
const UserController = require("../controller/user.controller");
const otpController = require("../controller/otp.controller");
const client = require("../config/db");
const QuestionModel = require('../model/question.model');
const QuestionModel1 = require('../model/question1.model');
const QuestionModel2 = require('../model/question2.model');
const TrueFalseModel = require('../model/truefalse.model');
const { connection } = require("mongoose");
const UserModel = require("../model/user.model");


router.post("/register",UserController.register);

router.post("/add",UserController.add);

router.post("/login",UserController.login);

router.post("/forgotPassword",UserController.forgotPassword);
router.post("/newName",UserController.newName);

// router.post('/register', async (req, res) => {
//     try {
//       // Your logic here
//       res.status(200).send({ message: 'Registration successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: 'Internal Server Error' });
//     }
//   });
  

// router.get('/test', (req, res) => {
//     res.send('Test endpoint works!');
// });
// router.get('/getUserData', async (req, res) => {
//     try {
//       const email = req.query.email; // Get the email from query params
//       if (!email) {
//         return res.status(400).json({ error: 'Email is required' });
//       }
  
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       res.json({
//         name: user.name,
//         email: user.email,
//         score: user.score,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });
router.get('/getUserData',UserController.getUserData);
router.get('/getUserData1',UserController.getUserData1);
router.get('/getAll', UserController.getAll);


router.get('/questions', async (req, res) => {
  try {
    const questions = await QuestionModel.find(); // Fetch all questions
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/questions1', async (req, res) => {
  try {
    const questions1 = await QuestionModel1.find(); // Fetch all questions
    res.json(questions1);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/questions2', async (req, res) => {
  try {
    const questions2 = await QuestionModel2.find(); // Fetch all questions
    res.json(questions2);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/truefalse', async (req, res) => {
  try {
    const questions1 = await TrueFalseModel.find(); //
    res.json(questions1);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Internal Server Error');
  }
});


// API to fetch questions



router.post('/deleteUserData',UserController.deleteUserData);

//router.post('/updateStreak',UserController.updateStreak);
router.post('/updateStreak',UserController.getAndUpdateStreak);

router.get('/getStreak',UserController.getStreak);

router.post("/otp-login",otpController.otpLogin);
router.post("/otp-verify",otpController.verifyOTP);

// router.post("/send-otp", UserController.sendOtp);
// router.post("/verify-otp", UserController.verifyOtp);

// router.post('/saveScore', async (req, res) => {
//   try {
//     const { _id, quiz1 } = req.body;

//     const newScore = new UserModel({
//       _id,
      
//       quiz1
//     });

//     await newScore.save();
//     res.status(200).send('Score saved');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving score');
//   }
// });

//router.post('/saveScore', UserController.saveScore);
router.post('/saveScore', async (req, res) => {
  try {
    const { _id, quiz1 } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      _id,
      { quiz1 },
      { new: true } // Return the updated document
    );
    //await updatedUser.save();
    // Update quiz1
    updatedUser.quiz1 = quiz1;

    // Recalculate final score manually
    updatedUser.finalScore = (updatedUser.quiz1 || 0) + (updatedUser.quiz2 || 0) + (updatedUser.project || 0);

    await updatedUser.save(); // Triggers

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Score saved');
  } catch (err) {
    console.error('Saving error:', err.message);
    res.status(500).send('Error saving score');
  }
});


  
  module.exports = router;


