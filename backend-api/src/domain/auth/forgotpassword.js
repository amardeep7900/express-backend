const User = require("../../infra/model/schema/user");
const AppError = require("../../infra/utlis/apperror");
const Asynchandler = require("../../infra/utlis/asynchandler");
const sendEmail = require("../../infra/utlis/email");

exports.forgotpass = Asynchandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email adress", 404));
  }
  //generate random reset token
  const resettoken = user.createpassresttoken();
  await user.save({ validateBeforeSave: false });

  //sent it to user's email
  const reseturl = `${req.protocol}://${req.get("host")}/reset/${resettoken}`;

  const message = `forgot your password? submit a PATCH request with your new password:${reseturl}.\n if you not forgot ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: "your password reset token",
      message,
    });
    res.json({
      status: "sucess",
      message: "token sent to the email",
    });
  } catch (err) {
    user.passwordresettoken = undefined;
    user.passwordresetexpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("there is an error sending the mail,try again"),
      500
    );
  }
});
