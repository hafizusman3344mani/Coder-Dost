const express = require("express");
const authController = require("../controller/auth");

const authRouter = express.Router();

authRouter.post('/signup',authController.createUser);
authRouter.post('/login',authController.loginUser);


exports.authRouter = authRouter;