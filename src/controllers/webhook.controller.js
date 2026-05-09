const aiService = require('../services/ai.service');
const githubService = require('../services/github.service');
const axios = require('axios'); 

exports.handleGithubWebhook = async (req, res) => {
    try {
        const payload = req.body;
        const event = req.headers['x-github-event'];

        if (event === 'pull_request' && (payload.action === 'opened' || payload.action === 'synchronize')) {
            const owner = payload.repository.owner.login;
            const repo = payload.repository.name;
            const pullNumber = payload.number;
            const diffUrl = payload.pull_request.diff_url;

            console.log(` Analyzing PR #${pullNumber} in ${repo}...`);

            const response = await axios.get(diffUrl);
            const codeDiff = response.data;

            const analysisResult = await aiService.analyzeCode(codeDiff);

            await githubService.createReviewComment(owner, repo, pullNumber, analysisResult);
            
            console.log(` Review posted for PR #${pullNumber}`);
        }

        res.status(200).send('Webhook processed successfully');
    } catch (error) {
        console.error(' Controller Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};