const mongoose = require("mongoose");
const crypto = require("crypto");

const validator = require("validator");
const bcrypt = require("bcryptjs");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide name"],
  },
  email: {
    type: String,

    unique: true,
    validate: { validator: validator.isEmail, message: "provide valid email" },
  },
  password: {
    type: String,
    required: [true, "enter valid password"],
    minlength: 6,
  },

  passwordchangedAt: Date,
  passwordresttoken: String,
  passwordresetexpires: Date,
});
userschema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userschema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.passwordchangedAt = Date.now() - 1000;
  next();
});
userschema.methods.correctPassword = async function (
  candidatepassword,
  userpassword
) {
  return await bcrypt.compare(candidatepassword, userpassword);
};
userschema.methods.passwordchangedAfter = function (JWTTimestamp) {
  if (this.passwordchangedAt) {
    const changedTimesstamp = parseInt(
      this.passwordchangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimesstamp, JWTTimestamp);
    return JWTTimestamp < changedTimesstamp;
  }
  //false means not changed
  return false;
};
userschema.methods.createpassresttoken = function () {
  const resettoken = crypto.randomBytes(32).toString("hex");
  this.passwordresttoken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  console.log({ resettoken }, this.passwordresttoken);
  this.passwordresetexpires = Date.now() + 10 * 60 * 1000;
  return resettoken;
};
module.exports = mongoose.model("user", userschema);
