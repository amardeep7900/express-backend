const {Joi} = require('express-validation');

const schema = {
  user: Joi.object({
    title:Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    
  }).unknown(),
}

module.exports=schema;