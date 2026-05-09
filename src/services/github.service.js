const { Octokit } = require("@octokit/rest");
const config = require('../config/index');

const octokit = new Octokit({ auth: config.github.token });

exports.createReviewComment = async (owner, repo, pullNumber, commentBody) => {
    try {
        await octokit.issues.createComment({
            owner,
            repo,
            issue_number: pullNumber,
            body: `###  Sentinel AI Code Review\n\n${commentBody}`
        });
        console.log(' Review comment posted successfully!');
    } catch (error) {
        console.error(' Octokit Error:', error.message);
        throw new Error('Failed to post comment on GitHub');
    }
};