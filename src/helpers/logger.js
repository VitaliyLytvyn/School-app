const { createLogger, format, transports } = require('winston')
const { timestamp, printf } = format
const expressWinston = require('express-winston')

const printFormat = printf(({ level, message, timestamp }) => {
    return `${level}: ${timestamp} ${message}`
})

const formatCombine = format.combine(
    timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.colorize(),
    format.json(),
    printFormat
)

const formatCombineFile = format.combine(
    timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    printFormat
)

const logger = createLogger({
    level: 'info',
    format: format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new transports.File({
            filename: './logs/combined.log',
            format: formatCombineFile,
            handleExceptions: true
        })
    ],
    exitOnError: false
})

// If we're not in production then log to the `console`
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: formatCombine,
            handleExceptions: true
        })
    )
}

const expressLogger = expressWinston.logger({
    transports: [
        new transports.Console()
    ],
    format: formatCombine,
    msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message.
    expressFormat: true, // use the default Express/morgan request formatting.
    colorize: true, // color the text and status code, using the Express/morgan color palette.
})

module.exports = {
    logger,
    expressLogger
}
