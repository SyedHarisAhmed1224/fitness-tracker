const router = require("express").Router();
const UserController = require("../controller/user.controller");

const client = require("../config/db");

const { connection } = require("mongoose");
const UserModel = require("../model/user.model");


router.post("/register",UserController.register);

router.post("/add",UserController.add);

router.post("/login",UserController.login);

router.post("/forgotPassword",UserController.forgotPassword);
router.post("/newName",UserController.newName);

router.get('/getUserData',UserController.getUserData);
router.get('/getUserData1',UserController.getUserData1);
router.get('/getAll', UserController.getAll);


router.post('/deleteUserData',UserController.deleteUserData);


  
  module.exports = router;


