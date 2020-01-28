require('dotenv').config({ path: './src/config/.env' })
const express = require('express')
const { logger } = require('./helpers/logger')
const middlewares = require('./middlewares')

const port = process.env.PORT
const app = express()

// set middlewares
middlewares(app)

// routing code:
//app.use(router);


app.listen(port, () => {
    logger.info(`App server started on port: ${port}`)
})