const { Joi } = require("express-validation");

const signup = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }).unknown(),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
  }).unknown(),
};
const create = {
  body: Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
  }).unknown(),
};
const changepass= {
  body:Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().required(),
    newPassword:Joi.string().required()
  }).unknown(),
}
module.exports = { login, signup, create,changepass };
