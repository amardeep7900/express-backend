const crypto = require("crypto");
const User = require("../../infra/model/schema/user");
const AppError = require("../../infra/utlis/apperror");
const jwt = require("jsonwebtoken");

const signtoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.resetpass = async (req, res, next) => {
  //get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordresettoken: hashedToken,
    passwordresetexpires: { $gt: Date.now() },
  });
  //if token has not expired,set the new password
  if (!user) {
    return next(new AppError("token is invalid or expired", 400));
  }
  user.password = req.body.password;
  user.passwordresettoken = undefined;
  user.passwordresetexpires = undefined;
  await user.save();

  //log the user and send jwt
  const token = signtoken(user._id);
  res.json({ status: "successs", token, user });
};
