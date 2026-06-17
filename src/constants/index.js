const GITHUB_EVENTS = {
    PULL_REQUEST: 'pull_request',
    PUSH: 'push',
    ISSUES: 'issues',
};

const PR_ACTIONS = {
    OPENED: 'opened',
    SYNCHRONIZE: 'synchronize',
    CLOSED: 'closed',
    REOPENED: 'reopened',
};

const REVIEW_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
};

const RESPONSE_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
};

const ERROR_CODES = {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    INTERNAL_ERROR: 'INTERNAL_ERROR',
};

module.exports = {
    GITHUB_EVENTS,
    PR_ACTIONS,
    REVIEW_STATUS,
    RESPONSE_STATUS,
    ERROR_CODES,
};