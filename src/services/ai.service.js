const { GoogleGenerativeAI } = require("@google/generative-ai");
const config = require('../config/index');

const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

exports.analyzeCode = async (codeDiff) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            You are a Senior Software Engineer and Security Auditor.
            Review the following code changes (diff) and provide feedback on:
            1. Security vulnerabilities.
            2. Code quality and best practices.
            3. Performance improvements.
            
            Keep the feedback professional and concise in Markdown format.
            
            Code to review:
            ${codeDiff}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error(" Gemini API Error:", error.message);
        throw new Error("Failed to analyze code with Gemini");
    }
};