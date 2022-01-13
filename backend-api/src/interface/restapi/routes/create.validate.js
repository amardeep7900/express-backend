const { user } = require('./apivalidation');

module.exports = {
  createvaliadtion: async (req, res, next) => {
    const value = await user.validate(req.body);

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