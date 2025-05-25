const express = require('express');
const body_parser = require('body-parser');
const nodemailer = require("nodemailer");

const userRouter = require('./routers/user.router');



const app = express();
app.use(body_parser.json());
app.use('/',userRouter);
module.exports = app;