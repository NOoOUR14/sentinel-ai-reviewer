require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGO_URI,
  },
  github: {
    token: process.env.GITHUB_TOKEN,
    webhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
  }
};

module.exports = config;