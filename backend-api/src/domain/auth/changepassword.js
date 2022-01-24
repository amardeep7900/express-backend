const User = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");

async function changePassword({ email, password, newPassword }) {
  const user = await User.findOne({ email }).select("+password");
  if(!user){
    return ErrorHandler.throwError({message:'your email is wrong'})
  }
  if (!(await user.correctPassword(password, user.password))) {
    return ErrorHandler.throwError({ message: "your password is wrong" });
  }

  user.password = newPassword;
  await user.save();
  return {
    message: "Password has been changed.",user
  };
}

module.exports = changePassword;
