const express = require("express");
const auth = require("../../domain/auth/protect");
const authrouter = express.Router();
const signup = require("../../domain/auth/signup");
const loginuser = require("../../domain/auth/login");
const changepassword = require("../../domain/auth/changepassword");
const {adduservaliadtion} = require('./signup.validate')
const{addloginvaliadtion}= require('./login.validate')
const forgotpassword=require('../../domain/auth/forgotpassword')
const resetpassword = require('../../domain/auth/resetpassword')

authrouter.get("/get", auth.protect, auth.getall);
authrouter.post("/signup", adduservaliadtion,signup.signup);
authrouter.post("/login", addloginvaliadtion,loginuser.login);
authrouter.patch("/changepass",auth.protect, changepassword.changepass);
authrouter.post('/forgot',forgotpassword.forgotpass)
authrouter.patch('/reset/:token',resetpassword.resetpass)

module.exports = authrouter;
