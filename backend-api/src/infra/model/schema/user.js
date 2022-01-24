const mongoose = require("mongoose");
const crypto = require("crypto");

const bcrypt = require("bcrypt");

const userschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  passwordRestToken: String,
  passwordResetExpires: Date,
});
userschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userschema.methods.correctPassword = async function (
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};

userschema.methods.createPassrestToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordRestToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordRestToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("user", userschema);
