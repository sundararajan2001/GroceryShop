const Joi = require('joi')

const userVal = Joi.object({

    username: Joi.string()
      .min(5)
      .max(20)
      .required(),

    password: Joi.string()
      .min(5)
      .max(10)
      .required(),

    role: Joi.string()
      .valid("Admin")
      .valid("User")
      .required()
  })



module.exports={userVal}