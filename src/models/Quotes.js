const { DataTypes, Sequelize } = require('sequelize')
const db = require('../db')
const {v4} = require('uuid')
const Users = require('./User')
const Quotes = db.define('quotes', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
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

Users.hasMany(Quotes, {foreignKey: 'userId'})
Quotes.belongsTo(Users, {foreignKey: 'userId'})
module.exports = Quotes