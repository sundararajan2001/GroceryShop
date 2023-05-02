require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.dialect,
        operatorsAliases: false,
       

        pool: {
            max: process.env.pool.min,
            min: process.env.pool.max,
            acquire: process.env.acquire,
            idle: process.env.idle
        },

        logging: false
    }  
)

sequelize.authenticate()
    .then(() => {
        console.log('DB Connected')
    }).catch(err => {
        console.log("Error");
    })

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.groceryItems = require('./groceryItemModel.js')(sequelize, DataTypes)
db.users = require('./userModel.js')(sequelize, DataTypes)
db.carts = require('./cartModel.js')(sequelize, DataTypes)
db.buyItems = require('./BuyItemsModel.js')(sequelize, DataTypes)

db.users.belongsToMany(db.groceryItems, { through: 'carts' });
db.groceryItems.belongsToMany(db.users, { through:  'carts'  });




db.buyItems.belongsTo(db.users);

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('DB sync done');
    })

module.exports = db