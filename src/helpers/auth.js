const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const Users = require('../models/User')
const dotenv = require('dotenv').config()
const secret = process.env.JWT_SECRET
const decryptToken = (token) => jwt.decode(token, secret);
module.exports = {
    hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    },
    comparePassword(plain, hashed) {
        return bcrypt.compareSync(plain, hashed)
    },
    encryptToken(payload) {
        return jwt.encode(payload, secret)
    },
    decryptToken(token) {
        return jwt.decode(token, secret)
    },
    decryptToken,
    async jwtValidation(req, res, next) {
        try {
            const authHeader = req.header("Authorization");
            if(!authHeader) {
                return res.status(401).send({
                    error: 'Unauthorized',
                    data: null,
                    status_code: 401
                })
            }
            const [n, token] = authHeader.split(" ")
            console.log(authHeader)
            const {id, email} = decryptToken(token)
            const found = await Users.findOne({
                where: {
                    email
                }
            })
            if(!found) {
                return res.status(401).send({
                    error: 'Unauthorized',
                    data: null,
                    status_code: 401
                })
            }
            const user = found.toJSON()
            delete user.password
            req.user = user
            next()
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                error: 'Bad Request',
                data: null,
                status_code: 500
            })
        }
    }
}