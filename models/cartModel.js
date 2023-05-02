const db = require('../models')

const Users = db.users
const GroceryItem = db.groceryItems

module.exports = (sequelize, DataTypes) => {


    const carts = sequelize.define("carts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,  
        },
        groceryItemId :{
            type: DataTypes.INTEGER,
            references: {
                model: GroceryItem, 
                key: 'id'
              }
        },
        userId :{
            type: DataTypes.INTEGER,
            references: {
                model: Users, 
                key: 'id'
              }
        },
        price: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
    })
    return carts
}
