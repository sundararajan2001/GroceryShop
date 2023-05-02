module.exports = (sequelize, DataTypes) => {

    const groceryItem = sequelize.define("groceryItem", {
        groceryName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER
        }

    })
    return groceryItem
}
