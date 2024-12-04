const QuotesComment = require("../models/QuotesComment")
const Users = require("../models/User")

class QuoteCommentController {
    static async findAll(req, res) {
        try {
            const {quoteId} = req.query
            const data = await QuotesComment.findAll({
                where: {
                    quoteId
                },
                include: [
                    {
                        model: Users,
                        attributes: {
                            exclude: ['password', 'deletedAt']
                        }
                    }
                ]
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
                data,
                status_code: 500,
            })
        }
    }
    static async create(req, res) {
        const { comment, quoteId } = req.body
        const { user } = req
        try {
            const data = await QuotesComment.create({
                comment,
                userId: user.id,
                quoteId
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

    static async update(req, res) {
        const { comment } = req.body
        const { id } = req.params
        try {
            const data = await QuotesComment.findOne({
                where: {
                    id
                }
            })
            if (!data) {
                return res.status(404).send({
                    error: 'Data not Found',
                    data,
                    status_code: 404,
                })
            }
            data.comment = comment
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
        const { id } = req.params
        try {
            const data = await QuotesComment.findOne({
                where: {
                    id
                }
            })
            if (!data) {
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

module.exports = QuoteCommentController