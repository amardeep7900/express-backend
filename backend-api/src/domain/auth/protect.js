const user = require("../../infra/model/schema/user");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Asynchandler = require("../../infra/utlis/asynchandler");
const AppError = require("../../infra/utlis/apperror");

exports.getall = Asynchandler(async (req, res, next) => {
  const all = await user.find();
  res.json(all);
});

exports.protect = Asynchandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("provide  token,you are not able to login", 404));
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


  // check if user exist
  const currentuser = await user.findById(decoded.id);
  if (!currentuser) {
    return next(new AppError("this user not exist", 404));
  }
  // if user change password after the token was issued
  if (currentuser.passwordchangedAfter(decoded.iat)) {
    return next(new AppError("user recently changed the password date", 404));
    //res.json({ message: "user recently changed the password" });
  }
  // access to protected route
  req.user = currentuser;

  next();
});


