const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db')
const { v4 } = require('uuid')
const Quotes = require('./Quotes')
const Users = require('./User')
const QuotesComment = db.define('quotes_comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: true
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: 'deleted_at',
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'SET NULL'
    },
    quoteId: {
        type: DataTypes.UUID,
        references: {
            model: 'quotes',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'SET NULL'
    }
}, {
    timestamps: true,
    freezeTableName: true, 
    paranoid: true,
    hooks: {
        beforeCreate: async(quotes) => {
            quotes.id = v4()
        }
    }
}) 

Quotes.hasMany(QuotesComment, {foreignKey: 'quoteId'})
QuotesComment.belongsTo(Quotes, {foreignKey: 'quoteId'})
Users.hasMany(QuotesComment, {foreignKey: 'userId'})
QuotesComment.belongsTo(Users, {foreignKey: 'userId'})
module.exports = QuotesComment