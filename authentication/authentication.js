const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const { where } = require('sequelize');
const UserTable = db.users
const bcrypt = require('bcrypt');


const authenticateAdmin = (req, res, next) => {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(404).send({ status: 404, message: " Token Not Present , please enter token!!" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
        if (err) {
            res.status(403).send({ status: 403, message: "Token Invalid" });
        }
        else {
            try {
                const jwt_role = await UserTable.findOne({ where: { username: user.username } })
                if(!jwt_role){
                    return res.status(404).send({ status: 404, message: "Username Mismatch" });
                }
                bcrypt.compare(user.password, jwt_role.password, function (err, result) {
                    console.log(result + "Response")

                    if (jwt_role.role == "Admin" && result == true) {
                        next();
                    }
                    else if(result==false)
                    {
                        return res.status(404).send({ status: 404, message: "Password Mismatch" });
                    }
                })

        }
        catch(err){
            res.status(404).send({ status: 404, message: "" + err })
        }
    }
});
}


const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(404).send({ status: 404, message: " Token Not Present , please enter token!!" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN, async (err, user) => {
            if (err) {
                res.status(403).send({ status: 403, message: "Token Invalid" });
            }
            else {
                try {
                    const jwt_role = await UserTable.findOne({ where: { username: user.username } })
                    if(!jwt_role){
                       return res.status(404).send({ status: 404, message: "Username Mismatch" });
                    }
                    console.log(jwt_role.password)
                    console.log(user.password)
                    bcrypt.compare(user.password, jwt_role.password, function (err, result) {
                        console.log(result + "Response")

                        if (jwt_role.role == "User" && result == true) {
                            next();
                        }
                        else if(result==false)
                        {
                            return res.status(404).send({ status: 404, message: "Password Mismatch" });
                        }
                    })
                }
                catch (err) {
                    res.status(404).send({ status: 404, message: "" + err })
                }
            }
        })
    }
    catch (err) {
        res.send({ status: 404, message: "" + err })
    }

}




module.exports = { authenticateAdmin, authenticateUser }