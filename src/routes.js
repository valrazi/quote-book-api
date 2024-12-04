const router = require('express').Router()
const AuthController = require('./controllers/AuthController')
const QuoteController = require('./controllers/QuoteController')
const QuoteCommentController = require('./controllers/QuoteCommentController')
const { jwtValidation } = require('./helpers/auth')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/quotes', QuoteController.findAll)
router.get('/quotes/:id', jwtValidation, QuoteController.findOne)
router.post('/quotes', jwtValidation, QuoteController.create)
router.put('/quotes/:id', jwtValidation, QuoteController.update)
router.delete('/quotes/:id', jwtValidation, QuoteController.delete)

router.get('/comment', jwtValidation, QuoteCommentController.findAll)
router.post('/comment', jwtValidation, QuoteCommentController.create)
router.put('/comment/:id', jwtValidation, QuoteCommentController.update)
router.delete('/comment/:id', jwtValidation, QuoteCommentController.delete)

module.exports = router