const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const logger = require('./utils/logger');
const { AppError } = require('./exceptions');

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Request logging
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.http(message.trim()),
    },
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
    res.send('Sentinel AI Server is Running!');
});

// API routes
const webhookRoutes = require('./routes/webhook.routes');
app.use('/api/webhooks', webhookRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404, 'NOT_FOUND'));
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || 'INTERNAL_ERROR';

    if (statusCode >= 500) {
        logger.error(`${errorCode}: ${err.message}`, { stack: err.stack });
    } else {
        logger.warn(`${errorCode}: ${err.message}`);
    }

    res.status(statusCode).json({
        status: 'error',
        error: {
            code: errorCode,
            message: err.isOperational ? err.message : 'An unexpected error occurred',
            ...(config.env === 'development' && { stack: err.stack }),
        },
    });
});

module.exports = app;