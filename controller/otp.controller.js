const UserService = require('../services/user.services');

exports.otpLogin= (req ,res ,next)=>{
    UserService.sendOTP(req.body, (error, results) =>{
        if(error){
            return res.status(400).send({
                message: "error",
                data: error,
            });
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.verifyOTP= (req ,res ,next)=>{
    UserService.verifyOtp(req.body, (error, results) =>{
        if(error){
            return res.status(400).send({
                message: "error",
                data: error,
            });
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};