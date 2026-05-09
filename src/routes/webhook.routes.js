const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhook.controller');
const { verifyGithubSignature } = require('../middlewares/githubAuth');

router.post('/', verifyGithubSignature, webhookController.handleGithubWebhook);



module.exports = router;
