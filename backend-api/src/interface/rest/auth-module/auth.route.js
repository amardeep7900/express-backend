const express = require("express");
const { validate, ValidationError } = require("express-validation");
const router = express.Router();
const validation = require("./auth.validation");
const ResponseHandler = require("../../../infra/utils/responseHandler");
const AsyncHandler = require("../../../infra/utils/asyncHandler");
const Auth = require("../../../domain/auth/index");
const Restcontroller = require("../../../domain/user/restcontroller");
//const Token = require("../../../infra/utils/encryption");

router.route("/signup").post(
  validate(validation.signup),
  AsyncHandler(async (req, res) => {
    const data = await Auth.signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/login").post(
  validate(validation.login),
  AsyncHandler(async (req, res) => {
    const data = await Auth.login({
      email: req.body.email,
      password: req.body.password,
    });

    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/changepass").patch(
  validate(validation.changepass),
  AsyncHandler(async (req, res, next) => {
    const data = await Auth.changePassword({
      email: req.body.email,
      password: req.body.password,
      newPassword: req.body.newPassword,
    });
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/forgot").post(
  AsyncHandler(async (req, res, next) => {
    const data = await Auth.forgotPassword(
      { email: req.body.email },
      req.protocol
    );
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/verify").post(
  AsyncHandler(async (req, res, next) => {
    const data = await Auth.verifyUserEmail({
      email: req.body.email,
      verificationToken: req.body.verificationToken,
    },req.protocol);
    res.send(data);
  })
);
router.route("/reset/:Token").patch(
  AsyncHandler(async (req, res, next) => {
    const data = await Auth.resetPassword(req.params.Token, {
      password: req.body.password,
    });
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/getall").get(AsyncHandler(Restcontroller.getall));
router.route("/create").post(
  validate(validation.create),
  AsyncHandler(async (req, res, next) => {
    const data = await Restcontroller.create({
      title: req.body.title,
      name: req.body.name,
      age: req.body.age,
    });
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/getone/:postId").get(
  AsyncHandler(async (req, res, next) => {
    const data = await Restcontroller.getuser(req.params.postId);

    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/delete/:postId").delete(
  AsyncHandler(async (req, res, next) => {
    const data = await Restcontroller.deleteted(req.params.postId);

    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.route("/update/:postId").patch(
  AsyncHandler(async (req, res, next) => {
    const data = await Restcontroller.update(req.params.postId, {
      title: req.body.title,
    });
    const response = {};
    response.success = true;
    response.statusCode = 200;
    response.data = data;
    return ResponseHandler(res, response);
  })
);
router.use(function (err, req, res, next) {
  console.log(err.details);
  // specific for validation errors
  if (err instanceof ValidationError) {
    const response = {};
    response.success = false;
    response.statusCode = 400;
    response.message = "Validation Error";
    response.data = err;
    return ResponseHandler(res, response);
  }
  return res.status(500).send(err.stack);
});

module.exports = router;
