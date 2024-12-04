const Users = require("../models/User")
const {hashPassword, comparePassword, encryptToken} = require('../helpers/auth')
const moment = require("moment")
class AuthController {
    static async register(req, res) {
        const {email, fullName, password} = req.body
        try {
            const found = await Users.findOne({
                where: {
                    email
                }
            })
            if(found) {
                return res.status(1006).send({
                    error: 'Account Exist',
                    data: null,
                    status_code: 1006
                })
            }
            let data = await Users.create({
                email,
                fullName,
                password: hashPassword(password),
                roleId: 3
            })
            data = data.toJSON()
            delete data.password
            return res.status(201).send({
                error: null,
                data,
                status_code: 201
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data: null,
                status_code: 500
            })
        }
    }

    static async login(req, res) {
        const {email, password} = req.body
        try {
            let user = await Users.findOne({
                where: {
                    email
                }
            })
            if(!user || !comparePassword(password, user.password)) {
                return res.status(401).send({
                    error: 'Invalid Credentials',
                    data: null,
                    status_code: 401
                })
            }
            const token = encryptToken({
                id: user.id,
                email: user.email,
                time: moment().toDate()
            })
            user = user.toJSON()
            delete user.password
            return res.status(200).send({
                error: null,
                data: {
                    token,
                    user
                },
                status_code: 420001
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data: null,
                status_code: 500
            })
        }
    }
}

module.exports = AuthController