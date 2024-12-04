const db = require('./db')
const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 4000
const router = require('./routes')
app.use(bodyParser.json({ limit: '20mb' }))

app.use(cors())

app.use('/api', router)

app.listen(port, async() => {
    console.log(`API running on PORT: ${port}`)
    try {
        await db.authenticate()
        console.log(`DB Connection Success`)
    } catch (error) {
        console.log(error)      
    }
})