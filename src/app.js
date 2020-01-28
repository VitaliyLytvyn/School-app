require('dotenv').config({ path: './src/config/.env' })
require('./db/mongoose') // in that way just ensures /mongoose module runs
const express = require('express')
const router = require('./routes')
const { logger } = require('./helpers/logger')
const middlewares = require('./middlewares')
const errorhandle = require('./middlewares/errorhandle')

const port = process.env.PORT
const app = express()

// set middlewares
middlewares(app)

// routing code
app.use(router);

// errorhandling
errorhandle(app)

app.listen(port, () => {
    logger.info(`App server started on port: ${port}`)
})