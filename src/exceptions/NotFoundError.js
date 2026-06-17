const AppError = require('./AppError');
const { ERROR_CODES } = require('../constants');

class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 404, ERROR_CODES.NOT_FOUND);
    }
}

module.exports = NotFoundError;