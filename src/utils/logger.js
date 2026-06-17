const winston = require('winston');
const config = require('../config');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = config.env === 'development' ? 'debug' : 'warn';

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
);

const transports = [
    new winston.transports.Console({
        format: config.env === 'development'
            ? winston.format.combine(winston.format.colorize(), format)
            : format,
    }),
    new winston.transports.File({
        filename: 'src/logs/error.log',
        level: 'error',
        format,
    }),
    new winston.transports.File({
        filename: 'src/logs/combined.log',
        format,
    }),
];

const logger = winston.createLogger({
    levels,
    level,
    format,
    transports,
});

module.exports = logger;