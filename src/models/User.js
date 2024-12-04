const { DataTypes } = require('sequelize')
const db = require('../db')
const {v4} = require('uuid')
const Roles = require('./Roles')
const Users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'full_name'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
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
    roleId: {
        type: DataTypes.UUID,
        references: {
            model: 'roles',
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
        beforeCreate: async(user) => {
            user.id = v4()
        }
    }
})

Roles.hasMany(Users, {foreignKey: 'roleId'})
Users.belongsTo(Roles, {foreignKey: 'roleId'})
module.exports = Users