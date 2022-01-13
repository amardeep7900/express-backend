const { login } = require("./authvalidation");

module.exports = {
  addloginvaliadtion: async (req, res, next) => {
    const value = await login.validate(req.body);

    if (value.error) {
      res.json({
       sucess:0,
      message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};