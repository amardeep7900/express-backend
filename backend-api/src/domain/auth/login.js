const user = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");
const Encryption = require("../../infra/utils/encryption");

async function login({ email, password }) {
  if (!email || !password) {
    return ErrorHandler.throwError({
      message: "please provide valid email and password",
      code: 400,
    });
  }

  const User = await user.findOne({ email }).select("+password");
  if (!User || !(await User.correctPassword(password, User.password))) {
    return ErrorHandler.throwError({
      message: "please provide valid email and password",
      code: 404,
    });
  }

  const token = Encryption.signToken(User._id);
  return { token, User };
}

module.exports = login;
