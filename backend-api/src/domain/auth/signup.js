const user = require("../../infra/model/schema/user");
const jwt = require("jsonwebtoken");
const Asynchandler=require ('../../infra/utlis/asynchandler')

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = Asynchandler(async (req, res, next) => {
  
    const newuser = await user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordchangedAt:req.body.passwordchangedAt
    });
    const token = signtoken(newuser._id);
    res.json({ status: "sucess", token, data: newuser });
   
});
