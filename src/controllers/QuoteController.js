const { Sequelize } = require("sequelize")
const Quotes = require("../models/Quotes")
const Users = require("../models/User")
const QuotesComment = require("../models/QuotesComment")

class QuoteController {
    static async create(req, res) {
        const { content, category } = req.body
        const { user } = req
        try {
            const data = await Quotes.create({
                content,
                category,
                userId: user.id
            })
            return res.status(201).send({
                error: null,
                data,
                status_code: 201,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data,
                status_code: 500,
            })
        }
    }
    static async findAll(req, res) {
        const { limit } = req.query ? Number(req.query) : 10
        try {
            const data = await Quotes.findAll({
                limit,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    },
                ],
                attributes: {
                    include: [
                        [Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM quotes_comment AS qc
                            WHERE qc.quoteId = quotes.id
                            AND qc.deleted_at IS NULL
                        )`), 'quoteCommentCount'] // Define the alias here
                    ]
                }
            })
            return res.status(200).send({
                error: null,
                data,
                status_code: 200,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                status_code: 500,
            })
        }
    }
    static async findOne(req, res) {
        const {id} = req.params
        try {
            const data = await Quotes.findOne({
                where: {
                    id
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    }
                ],
                attributes: {
                    include: [
                        [Sequelize.literal(`(
                            SELECT COUNT(*) 
                            FROM quotes_comment AS qc
                            WHERE qc.quoteId = quotes.id
                            AND qc.deleted_at IS NULL
                        )`), 'quoteCommentCount'] // Define the alias here
                    ]
                }
            })
            if(!data) {
                return res.status(404).send({
                    error: 'Data not Found',
                    data,
                    status_code: 404,
                })
            }
            return res.status(200).send({
                error: null,
                data,
                status_code: 200,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data,
                status_code: 500,
            })
        }
    }
    static async update(req, res) {
        const {id} = req.params
        const {content} = req.body
        try {
            const data = await Quotes.findOne({
                where: {
                    id
                }
            })
            if(!data) {
                return res.status(404).send({
                    error: 'Data not Found',
                    data,
                    status_code: 404,
                })
            }
            data.content = content
            await data.save()
            return res.status(200).send({
                error: null,
                data,
                status_code: 200,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data,
                status_code: 500,
            })
        }
    }
    static async delete(req, res) {
        const {id} = req.params
        try {
            const data = await Quotes.findOne({
                where: {
                    id
                }
            })
            if(!data) {
                return res.status(404).send({
                    error: 'Data not Found',
                    data,
                    status_code: 404,
                })
            }
            await data.destroy()
            return res.status(200).send({
                error: null,
                data,
                status_code: 200,
            })
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                error: 'Bad Request',
                data,
                status_code: 500,
            })
        }
    }
}

module.exports = QuoteController