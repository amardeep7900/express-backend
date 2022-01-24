const User = require("../../infra/model/schema/user");
const ErrorHandler= require("../../infra/utils/errorHandler");
const sendEmail = require('../notification/base/sendEmail');

async function forgotPassword({ email }, protocol) {
  const user = await User.findOne({ email });
  if (!user) {
    return ErrorHandler.throwError({
      message: "there is no user with this email address",
      code: 404,
    });
  }
  //generate random reset token
  const resetToken = user.createPassrestToken();
  await user.save();

  //sent it to user's email
  const reseturl = `${protocol}://reset/${resetToken}`;

  const message = `forgot your password? submit a PATCH request with your new password:${reseturl}.\n if you not forgot ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token",
      message,
    });
    return {
      status: "sucess",
      message: "token sent to the email",
    };
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return ErrorHandler.throwError({
      message: "there is an error sending the mail,try again",
      code: 400,
    });
  }
}

module.exports = forgotPassword;
