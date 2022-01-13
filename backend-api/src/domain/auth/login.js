const user = require("../../infra/model/schema/user");
const jwt = require("jsonwebtoken");
const AppError = require("../../infra/utlis/apperror");

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide valid email and password", 404));
    
  }

  const User = await user.findOne({ email }).select("+password");
  if (!User || !(await User.correctPassword(password, User.password))) {

    return next(new AppError('please provide valid email and password',404))
  
  }

  const token = signtoken(User._id);
  res.json({ status: "sucess", token,User });
};
