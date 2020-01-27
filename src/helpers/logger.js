const { createLogger, format, transports } = require('winston')
const { timestamp, printf } = format

const printFormat = printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp} ${message}`
})

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new transports.File({
            filename: './logs/combined.log',
            format: format.combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                printFormat
            ),
            handleExceptions: true
        })
    ],
    exitOnError: false
})

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                format.colorize(),
                printFormat
            ),
            handleExceptions: true
        })
    )
}

module.exports = {
    logger
}
