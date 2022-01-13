const { Joi } = require("express-validation");

const schema = {
  signup: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }).unknown(),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }).unknown(),
};
module.exports = schema;
