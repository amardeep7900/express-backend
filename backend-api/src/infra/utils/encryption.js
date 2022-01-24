const jwt = require("jsonwebtoken");
const ErrorHandler = require("./errorHandler");

async function getToken(req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return ErrorHandler({
      message: "provide  token,you are not able to login",
      code: 404,
    });
  }
  const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = verifytoken;
  next();
}
 function signToken(id){
  return  jwt.sign( {_id:id} , process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = { getToken,signToken };
