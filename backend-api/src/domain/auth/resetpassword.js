const crypto = require("crypto");
const User = require("../../infra/model/schema/user");
const ErrorHandler = require("../../infra/utils/errorHandler");
const Encryption= require('../../infra/utils/encryption')


async function resetPassword(Token, { password }) {
  //get user based on the token
  const hashedToken = crypto.createHash("sha256").update(Token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //if token has not expired,set the new password
  if (!user) {
    return ErrorHandler.throwError({ message: "token is invalid or expired", code: 400 });
  }
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //log the user and send jwt
  const token = Encryption.signToken(user._id);
  return { token, user };
}
module.exports = resetPassword;
