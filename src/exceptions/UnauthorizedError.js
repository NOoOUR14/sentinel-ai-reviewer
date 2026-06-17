const AppError = require('./AppError');
const { ERROR_CODES } = require('../constants');

class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, 401, ERROR_CODES.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedError;