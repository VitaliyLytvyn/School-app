require('dotenv').config({ path: './src/config/.env' })
const express = require('express')
const { logger } = require('./helpers/logger')

const app = express()
const port = process.env.PORT

app.listen(port, () => {
    logger.info(`Custom log server started on port: ${port}`)
})