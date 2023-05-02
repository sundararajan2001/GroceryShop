module.exports = {

    HOST: 'localhost',
    USER: 'root',
    PASSWORD: 'Sundar2001@',
    DB: 'grocerydb',
    dialect: 'mysql',
    logging: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000

    }



}