const AppError = require('./AppError');
const { ERROR_CODES } = require('../constants');

class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 400, ERROR_CODES.VALIDATION_ERROR);
    }
}

module.exports = ValidationError;