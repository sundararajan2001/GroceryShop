const db = require('../models')
const Carts = db.carts
const Buy = db.buyItems
const User = db.users
const Joi = require('joi')


const BuyGrocery = async (req, res) => {
    try {
        const cartt = await Carts.findByPk(req.body.cartId)
        let info = {
            userId: req.body.userId,
            productStatus: req.body.productStatus,
            groceryItemId: cartt.groceryItemId,
            price: cartt.price,
            quantity: cartt.quantity,
            prodTime: new Date(),
            nextTwo: new Date(Date.now() + 1 * (60 * 60 * 1000))
        }
        const JoiSchema = Joi.object({

            userId: Joi.number()
                .required(),

            productStatus: Joi.string()
                .required(),
            prodTime: Joi.date(),
            nextTwo: Joi.date(),
            groceryItemId: Joi.number().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required()
        })

        const validate_Res = JoiSchema.validate(info);

        console.log(validate_Res);
        if (validate_Res.error) {
            res.status(404).send({ status: 404, message: "Joi Validation Error", data: "" + validate_Res.error });
        }
        else {
            try {
                const BuyGroceyItem = await Buy.create(info)
                res.status(200).send({ status: 200, message: "Order Placed Successfully (You can cancel this product within 1 hour)", data: BuyGroceyItem });
                const dltCart = await Carts.destroy({ where: { id: req.body.cartId } });
            }
            catch (err) {
                res.status(404).send({ status: 404, message: "Data not Created" + err, data: null });
            }

        }

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "API cutted" + err, data: null });
    }


}

const findBuyProduct = async (req, res) => {
    try {
        const buyGrocery = await Buy.findByPk(req.params.id, {
            include: [
                {
                    model: Carts

                }
            ]
        });
        console.log(buyGrocery);
        res.status(200).send({ status: 200, message: "Data Fetched Successfully!! ", data: buyGrocery });

    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data not Fetched" + err, data: null });
    }
}


const deleteProd = async (req, res) => {


    try {
        const buyProd = await Buy.findByPk(req.params.id)

        if (buyProd.nextTwo < new Date()) {

            console.log(buyProd.nextTwo);
            console.log(new Date());
            res.status(404).send({ status: 404, message: "You can't Cancel this Order, Time Out!!" });
        }
        else {
            try {
                console.log(buyProd.nextTwo);
                console.log(new Date());
                const dltProd = await Buy.destroy({ where: { id: req.params.id } });
                res.status(200).send({ status: 200, message: "Data Deleted Successfully" });
            }
            catch {
                res.status(404).send({ status: 404, message: "Data not Deleted" + err, data: null });
            }

        }

    } catch (err) {
        res.status(404).send({ status: 404, message: "Data not Deleted" + err, data: null });
    }
}

const findUserpurchased = async (req, res) => {
    try {
        const id = req.params.id;
        const userGrocery = await Buy.findAll({ attributes: ["userId", "groceryItemId", "price", "quantity", "productStatus"] }, { where: { userId: id } });
        res.status(200).send({ status: 200, message: "User Purchased History ", data: userGrocery });
    }
    catch (err) {
        res.status(404).send({ status: 404, message: "Data Not Fetched " + err, data: null })
    }
}

module.exports = { BuyGrocery, findBuyProduct, deleteProd, findUserpurchased }



