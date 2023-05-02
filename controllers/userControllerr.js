const db = require('../models')
const Joi = require('joi')
const bcrypt = require('bcrypt');


const Users = db.users
const GroceryItem = db.groceryItems
const Carts = db.carts
const Buy = db.buyItems

function structure(data,message,status){
  return { status,message,data}
}


const addUser = async (req, res) => {
  const pass = req.body.password
  const salt = await bcrypt.genSalt(10);
  const cryptpass = await bcrypt.hash(pass, salt);
  let info = {
    username: req.body.username,
    password: cryptpass,
    role: req.body.role
  }
  try {
    const user = await Users.create(info)
    res.status(200).json(structure(user,"Signed in Successfully!! ",200))
  }
  catch (err) {
    res.status(404).json(structure( null,"API cutted "+err ,404))
}
  }






const getAllUsers = async (req, res) => {
  try {
    let getusers = await Users.findAll()
    res.status(200).json(structure(getusers,"Data Fetched Successfully!! ",200))
  }
  catch (err) {
    res.status(404).json(structure( null,"Data Not Fetched "+err ,404))
  }
}


async function findAllUserss(req, res) {
  try {
    const usersGrocery = await Users.findAll({
      attributes: ["username"],
      include: [
        {
          model: GroceryItem,
          attributes: ["groceryName", "price"],
          through: {
            model: Carts,
            attributes: ["price", "quantity"],
          }

        },
      ],
    });
     res.status(200).json(structure(getusers,"Data Fetched Successfully!! ",200))
  }
  catch (err) {
    res.status(404).json(structure( null,"Data Not Fetched "+err ,404))
  }
}


const findUserGrocery = async (req, res) => {
  try {
    const userGrocery = await Users.findByPk(req.params.id, {
      attributes: ["username"],
      include: [
        {

          model: GroceryItem,
          attributes: ["groceryName", "price"],
          through: {
            model: Carts,
            attributes: ["price", "quantity"],
          }

        },
      ],
    });
    res.status(200).json(structure(userGrocery,"Data Fetched Successfully!! ",200))
  }
  catch (err) {
    res.status(404).json(structure( null,"Data Not Fetched "+err ,404))
  }

}


const findUserpurchased = async (req, res) => {
  try {
    const userGrocery = await Users.findByPk(req.params.id, {
      attributes: ["username"],
      include: [
        {
          model: Buy
        },
      ],
    });
    res.status(200).json(structure(userGrocery,"Data Fetched Successfully!! ",200))
  }
  catch (err) {
    res.status(404).json(structure( null,"Data Not Fetched "+err ,404))
  }

}

module.exports = { getAllUsers, addUser, findAllUserss, findUserGrocery, findUserpurchased }
