const user = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");
const Encryption = require("../../infra/utils/encryption");

async function login({ email, password }) {
  const users = await user.findOne({ email });
  if (!users) {
    return ErrorHandler.throwError({
      message: "please enter valid email",
      code: 400,
    });
  }
  const correctPass = users.comparePassword(password);
  if (!correctPass) {
    return ErrorHandler.throwError({
      message: "enter valid password",
      code: 400,
    });
  }

  const token = Encryption.signToken(users._id);
  return { token, users };
}

module.exports = login;
