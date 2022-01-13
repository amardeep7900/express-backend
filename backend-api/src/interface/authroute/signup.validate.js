const { signup } = require("./authvalidation");

module.exports = {
  adduservaliadtion: async (req, res, next) => {
    const value = await signup.validate(req.body);

    if (value.error) {
      res.json({
      message: value.error.details[0].message,
      });
    } else {
      next();
    }
  },
};
