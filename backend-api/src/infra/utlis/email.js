const nodemailer = require("nodemailer");

const sendemail = async (options) => {
  //create a transporter

  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  ///define the email options
  const mailOptions = {
    from: "amardeep <amar402@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //send the email
  await transpoter.sendMail(mailOptions);
};
module.exports = sendemail;
