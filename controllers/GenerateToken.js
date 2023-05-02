const Joi = require('joi')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
const { where } = require('sequelize');
const UserTable = db.users

function structure(data, message, status) {
    return { status, message, data }
}

const GenerateToken = (req, res) => {

    const reqinfo = {
        username: req.body.username,
        password: req.body.password
    }

    const JoiSchema = Joi.object({

        username: Joi.string()
            .min(5)
            .max(20)
            .required(),

        password: Joi.string()
            .min(5)
            .required(),
    })

    const validate_Res = JoiSchema.validate(reqinfo);
    if (validate_Res.error) {
        res.status(404).json(structure(null, "Joi Validation Error " + validate_Res.error, 404))
    }
    else {
        try {
            const accestoken = jwt.sign(reqinfo, process.env.ACCESS_TOKEN);
            res.status(200).json(structure(accestoken, "Log-in Successfully!! ", 200))
        }
        catch (err) {
            res.status(404).json(structure(null, "Token not Generated " + err, 404))
        }
    }
}

module.exports = { GenerateToken }