const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

const getModel = (modelName = 'gemini-1.5-flash') => {
    return genAI.getGenerativeModel({ model: modelName });
};

const generateReviewPrompt = (codeDiff) => {
    return `
You are a Senior Software Engineer and Security Auditor.
Review the following code changes (diff) and provide feedback on:
1. Security vulnerabilities.
2. Code quality and best practices.
3. Performance improvements.

Keep the feedback professional and concise in Markdown format.

Code to review:
${codeDiff}
    `.trim();
};

const analyzeWithModel = async (codeDiff, modelName) => {
    try {
        const model = getModel(modelName);
        const prompt = generateReviewPrompt(codeDiff);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        logger.error(`AI model analysis error: ${error.message}`);
        throw new Error('Failed to analyze code with AI model');
    }
};

module.exports = {
    getModel,
    generateReviewPrompt,
    analyzeWithModel,
};