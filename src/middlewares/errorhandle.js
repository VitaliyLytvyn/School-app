const { logger } = require('../helpers/logger')

const errorHandle = app => {
    app.use((err, req, res, next) => {
        logger.error(err.stack)

        const { statusCode, message } = err;
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message
        })
    })
}

module.exports = errorHandle