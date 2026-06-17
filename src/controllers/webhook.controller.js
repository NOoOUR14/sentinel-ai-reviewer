const axios = require('axios');
const logger = require('../utils/logger');
const asyncHandler = require('../utils/asyncHandler');
const { reviewProcessor } = require('../jobs');
const { validatePullRequestPayload } = require('../validators/webhook.validator');
const { ValidationError } = require('../exceptions');

exports.handleGithubWebhook = asyncHandler(async (req, res) => {
    const payload = req.body;
    const event = req.headers['x-github-event'];

    if (event === 'pull_request' && (payload.action === 'opened' || payload.action === 'synchronize')) {
        const { error } = validatePullRequestPayload(payload);
        if (error) {
            throw new ValidationError(`Invalid payload: ${error.details[0].message}`);
        }

        const owner = payload.repository.owner.login;
        const repo = payload.repository.name;
        const pullNumber = payload.number;
        const diffUrl = payload.pull_request.diff_url;

        logger.info(`Analyzing PR #${pullNumber} in ${owner}/${repo}`);

        const response = await axios.get(diffUrl);
        const codeDiff = response.data;

        await reviewProcessor.processReview(owner, repo, pullNumber, diffUrl, codeDiff);

        logger.info(`Review posted for PR #${pullNumber}`);
    }

    res.status(200).send('Webhook processed successfully');
});