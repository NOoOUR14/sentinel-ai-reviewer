const Joi = require('joi');

const githubWebhookSchema = Joi.object({
    'x-github-event': Joi.string().valid('pull_request', 'push', 'issues').required(),
    'x-hub-signature-256': Joi.string().required(),
}).unknown(true);

const pullRequestPayloadSchema = Joi.object({
    action: Joi.string().valid('opened', 'synchronize', 'closed', 'reopened').required(),
    pull_request: Joi.object({
        number: Joi.number().integer().required(),
        diff_url: Joi.string().uri().required(),
        title: Joi.string().optional(),
        body: Joi.string().allow('').optional(),
    }).required(),
    repository: Joi.object({
        owner: Joi.object({
            login: Joi.string().required(),
        }).required(),
        name: Joi.string().required(),
        full_name: Joi.string().optional(),
    }).required(),
}).unknown(true);

const validateWebhookHeaders = (headers) => {
    return githubWebhookSchema.validate(headers, { allowUnknown: true });
};

const validatePullRequestPayload = (body) => {
    return pullRequestPayloadSchema.validate(body, { allowUnknown: true });
};

module.exports = {
    validateWebhookHeaders,
    validatePullRequestPayload,
};