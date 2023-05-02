module.exports = (sequelize, DataTypes) => {

  const buyItem = sequelize.define("buyItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,

    },
    productStatus: {

      type: DataTypes.STRING,
      allowNull: false,

    }, prodTime: {

      type: DataTypes.DATE,
      allowNull: false,

    }, nextTwo: {

      type: DataTypes.DATE,
      allowNull: false,

    },

    groceryItemId: {
      type: DataTypes.INTEGER,
    },

    price: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    },

  })
  return buyItem
}