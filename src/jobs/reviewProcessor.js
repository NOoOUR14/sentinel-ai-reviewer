const aiService = require('../services/ai.service');
const githubService = require('../services/github.service');
const { Review, PullRequest, Repository } = require('../models');
const logger = require('../utils/logger');

const processReview = async (owner, repo, pullNumber, diffUrl, codeDiff) => {
    try {
        logger.info(`Starting review for PR #${pullNumber} in ${owner}/${repo}`);

        let repository = await Repository.findOne({ owner, name: repo });
        if (!repository) {
            repository = await Repository.create({
                name: repo,
                owner,
                fullName: `${owner}/${repo}`,
            });
        }

        let pullRequest = await PullRequest.findOne({
            repository: repository._id,
            githubPrId: pullNumber,
        });
        if (!pullRequest) {
            pullRequest = await PullRequest.create({
                repository: repository._id,
                githubPrId: pullNumber,
                diffUrl,
            });
        }

        const review = await Review.create({
            repository: repository._id,
            pullRequest: pullRequest._id,
            status: 'pending',
        });

        const analysisText = await aiService.analyzeCode(codeDiff);

        const sections = {
            security: [],
            quality: [],
            performance: [],
        };

        const lowerText = analysisText.toLowerCase();
        const lines = analysisText.split('\n');
        let currentSection = null;

        for (const line of lines) {
            if (line.match(/security|vulnerabilit|injection|xss/i)) {
                currentSection = 'security';
            } else if (line.match(/quality|best practice|code style|maintain/i)) {
                currentSection = 'quality';
            } else if (line.match(/performance|efficient|slow|optim/i)) {
                currentSection = 'performance';
            }

            if (currentSection && line.trim()) {
                sections[currentSection].push(line.trim());
            }
        }

        review.status = 'completed';
        review.summary = analysisText.substring(0, 500);
        review.securityIssues = sections.security.slice(0, 10);
        review.qualityIssues = sections.quality.slice(0, 10);
        review.performanceIssues = sections.performance.slice(0, 10);
        review.rawAnalysis = analysisText;
        await review.save();

        await githubService.createReviewComment(owner, repo, pullNumber, analysisText);

        logger.info(`Review completed for PR #${pullNumber}`);
        return review;
    } catch (error) {
        logger.error(`Review processing failed for PR #${pullNumber}: ${error.message}`);
        throw error;
    }
};

module.exports = { processReview };