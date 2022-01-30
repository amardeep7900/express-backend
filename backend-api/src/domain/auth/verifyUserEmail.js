//const { welcomeEmail } = require('../../domain/notification/email');
const ErrorHandler = require("../../infra/utils/errorHandler");
const User = require("../../infra/model/schema/user");
const sendEmail=require('../notification/base/sendEmail')

async function verifyUserEmail({ email, verificationToken },protocol) {
  const user = await User.findOne({ email });
  if (!user) {
    return ErrorHandler.throwError({
      message: "Account not found",
      code: 404,
    });
  }
  if (user.verified) {
    return ErrorHandler.throwError({
      message: "You have already verified your email",
      code: 404,
    });
  }

  if (user.verificationToken !== verificationToken) {
    return ErrorHandler.throwError({
      message: "Invalid Verification Token",
      code: 400,
    });
  }
  await User.updateOne(
    { email },
    {
      $set: { verified: user.verificationToken === verificationToken },
      $unset: { verificationToken: 1 },
    }
  );
  // await welcomeEmail({ email, name: user.name });
  //return true;
  const reseturl = `${protocol}://reset/${resetToken}`;
  const message = `forgot your password? submit a PATCH request with your new password:${reseturl}.\n if you not forgot ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your verified token",
      message,
    });
    return {
      status: "sucess",
      message: "token sent to the email",
    };
  } catch (err) {
    // user.passwordResetToken = undefined;
    //user.passwordResetExpires = undefined;
    await user.save();
    return ErrorHandler.throwError({
      message: "there is an error sending the mail,try again",
      code: 400,
    });
  }
}

module.exports = verifyUserEmail;
