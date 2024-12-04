const { Sequelize } = require('sequelize')

const dotenv = require('dotenv').config()

const {DB_NAME, DB_USER, DB_PASSWORD, DB_DIALECT, DB_PORT, DB_HOST} = process.env
const sequelize = new Sequelize({
    database: DB_NAME,
    dialect: DB_DIALECT,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
})
module.exports = sequelize