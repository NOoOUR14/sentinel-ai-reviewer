const { Octokit } = require('@octokit/rest');
const config = require('../config');

const octokit = new Octokit({ auth: config.github.token });

const getPullRequestDiff = async (owner, repo, pullNumber) => {
    const response = await octokit.pulls.get({
        owner,
        repo,
        pull_number: pullNumber,
        mediaType: {
            format: 'diff',
        },
    });
    return response.data;
};

const getPullRequestFiles = async (owner, repo, pullNumber) => {
    const response = await octokit.pulls.listFiles({
        owner,
        repo,
        pull_number: pullNumber,
    });
    return response.data;
};

const getPullRequestDetails = async (owner, repo, pullNumber) => {
    const response = await octokit.pulls.get({
        owner,
        repo,
        pull_number: pullNumber,
    });
    return response.data;
};

module.exports = {
    getPullRequestDiff,
    getPullRequestFiles,
    getPullRequestDetails,
};