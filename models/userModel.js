const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }}
        
        
    //     ,{
    //     hooks: {
    //         beforeCreate: (user) => {
    //           const salt = bcrypt.genSaltSync(10);
    //           user.password = bcrypt.hashSync(user.password, salt);
    //         }
    //       }
    // }
    
    );

    return users;
}


