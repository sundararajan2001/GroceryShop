const db = require('../models')
const Joi = require('joi')

const GroceryItem = db.groceryItems

function structure(data, message, status) {
    return { status, message, data }
}

const addGrocery = async (req, res) => {
    try {
        let info = {
            groceryName: req.body.groceryName,
            price: req.body.price
        }

        // const validate_Res = JoiSchema.validate(info);

        // console.log(validate_Res);
        // if (validate_Res.error) {
        //     res.status(404).json(structure( null,"Joi Validation Error "+validate_Res.error ,404))
        // }
        // else {
        const grocery = await GroceryItem.create(info)
        res.status(200).json(structure(grocery, "Grocery Added!! ", 200))


    }
    catch (err) {
        res.status(404).json(structure(null, "API cutted " + err, 404))
    }

}

const getAllGroceryItems = async (req, res) => {
    try {
        const groceryItems = await GroceryItem.findAll()
        res.status(200).json(structure(groceryItems, "Data Fetched Successfully!! ", 200))
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }


}

const getGroceryUsers = async (req, res) => {
    let id = req.params.id
    try {
        const data = await GroceryItem.findAll({
            include: [{
                model: user,
                as: 'users'
            }]
        })
        res.status(200).json(structure(data, "Data Fetched Successfully!! ", 200))

    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }

}
const dltGrocery = async (req, res) => {

    try {
        const dltGroceryItem = await GroceryItem.destroy({ where: { id: req.params.id } });
        res.status(200).json(structure("Data Deleted Successfully!! ", 200))
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }


}

module.exports = {
    addGrocery,
    getAllGroceryItems,
    getGroceryUsers,
    dltGrocery
}