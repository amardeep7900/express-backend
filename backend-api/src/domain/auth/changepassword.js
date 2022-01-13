const User = require("../../infra/model/schema/user");
const AppError = require("../../infra/utlis/apperror");
const Asynchandler = require("../../infra/utlis/asynchandler");
const jwt = require("jsonwebtoken");

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.changepass = Asynchandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.currentpassword, user.password))) {
    return next(new AppError("your current password is wrong", 401));
  }

  user.password = req.body.password;
  await user.save();

  const token = signtoken(user._id);
  res.json({ status: "successs", token, user });
});
