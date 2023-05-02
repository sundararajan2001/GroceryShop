const db = require('../models')
const Joi = require('joi')
const GroceryItem = db.groceryItems
const Users = db.users;
const Carts = db.carts
const Buy = db.buyItems;

function structure(data, message, status) {
    return { status, message, data }
}


const addCart = async (req, res) => {
    try {
        const chumma = await GroceryItem.findByPk(req.body.groceryItemId)
        const q = req.body.quantity

        let info = {
            groceryItemId: req.body.groceryItemId,
            price: chumma.price * q,
            quantity: req.body.quantity,
            userId: req.body.userId
        }

        const JoiSchema = Joi.object({

            groceryItemId: Joi.number()
                .required(),

            price: Joi.number()
                .required(),

            quantity: Joi.number()
                .required(),

            userId: Joi.number()
                .required(),
        })

        const validate_Res = JoiSchema.validate(info);

        console.log(validate_Res);
        if (validate_Res.error) {
            res.status(404).send({ status: 404, message: "Joi Validation Error", data: "" + validate_Res.error });
        }
        else {

            try {
                const addCartt = await Carts.create(info)
                res.status(200).json(structure(addCartt, "Cart Added successfully!! ", 200))
            }
            catch (err) {
                res.status(404).json(structure(null, "Data Not Created " + err, 404))
            }

        }
    }
    catch (err) {
        res.status(404).json(structure(null, "API cutted " + err, 404))
    }


}

const getAllCarts = async (req, res) => {
    try {
        let getcarts = await Carts.findAll()
        res.status(200).json(structure(getcarts, "Data Fetched Successfully!! ", 200))
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }
}
const getCarts = async (req, res) => {
    try {
        let getcarts = await Carts.findOne({ where: { id: req.params.id } })
        res.status(200).json(structure(getcarts, "Data Fetched Successfully!! ", 200))
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }
}

const editQty = async (req, res) => {
    try {
        const chumma = await Carts.findByPk(req.params.id)
        let edit = chumma.price / chumma.quantity
        let info = {
            price: req.body.quantity * edit,
            quantity: req.body.quantity,
        }
        try {
            let editQty = await Carts.update(info, { where: { id: req.params.id } });
            res.status(200).json(structure(info, "Cart Updated successfully ", 200));
        }
        catch (err) {
            res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
        }
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }

}


const dltCart = async (req, res) => {
    try {
        const dltCart = await Carts.destroy({ where: { id: req.params.id } });
        res.status(200).json(structure(null, "Cart Deleted successfully ", 200));
    }
    catch (err) {
        res.status(404).json(structure(null, "Data Not Fetched " + err, 404))
    }

}



module.exports = { getAllCarts, addCart, editQty, dltCart, getCarts }

