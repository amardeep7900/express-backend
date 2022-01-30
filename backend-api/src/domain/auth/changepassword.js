const User = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");

async function changePassword({ email, password, newPassword }) {
  const user = await User.findOne({ email });
  if (!user) {
    return ErrorHandler.throwError({ message: "your email is wrong" });
  }
  const correctPass = user.comparePassword(password);
  if (!correctPass) {
    return ErrorHandler.throwError({
      message: "your password is wrong",
      code: 400,
    });
  }

  user.password = newPassword;
  await user.save();
  return {
    message: "Password has been changed.",
    user,
  };
}

module.exports = changePassword;
