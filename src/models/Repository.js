const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            default: '',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

repositorySchema.index({ owner: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Repository', repositorySchema);