const user = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");
const Encryption = require("../../infra/utils/encryption");

async function signup({ name, email, password }) {
  const emailexist = await user.findOne({ email });
  if (emailexist) {
    return ErrorHandler.throwError({
      message: "email already exist please use another email to signup",
    });
  }
  const newuser = new user({ name, email, password });

  await newuser.save();

  const token = Encryption.signToken(newuser._id);
  return { token, newuser };
}

module.exports = signup;
