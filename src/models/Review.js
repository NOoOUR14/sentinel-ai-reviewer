const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        repository: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repository',
            required: true,
        },
        pullRequest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PullRequest',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
        summary: {
            type: String,
            default: '',
        },
        securityIssues: {
            type: [String],
            default: [],
        },
        qualityIssues: {
            type: [String],
            default: [],
        },
        performanceIssues: {
            type: [String],
            default: [],
        },
        rawAnalysis: {
            type: String,
            default: '',
        },
        reviewedBy: {
            type: String,
            default: 'Sentinel AI',
        },
    },
    {
        timestamps: true,
    }
);

reviewSchema.index({ pullRequest: 1 });
reviewSchema.index({ repository: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);