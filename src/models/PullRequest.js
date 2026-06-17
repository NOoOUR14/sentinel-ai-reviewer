const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema(
    {
        repository: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repository',
            required: true,
        },
        githubPrId: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            default: '',
        },
        body: {
            type: String,
            default: '',
        },
        author: {
            type: String,
            default: '',
        },
        diffUrl: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            enum: ['open', 'closed', 'merged'],
            default: 'open',
        },
    },
    {
        timestamps: true,
    }
);

pullRequestSchema.index({ repository: 1, githubPrId: 1 }, { unique: true });
pullRequestSchema.index({ repository: 1, state: 1 });

module.exports = mongoose.model('PullRequest', pullRequestSchema);