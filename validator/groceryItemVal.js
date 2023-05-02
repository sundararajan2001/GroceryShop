const Joi = require('joi')

const groceryVal = Joi.object({

    groceryName: Joi.string()
        .min(5)
        .max(20)
        .required(),

    price: Joi.number().precision(2)
        .required(),
})


module.exports ={ groceryVal }

