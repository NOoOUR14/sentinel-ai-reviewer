const crypto = require('crypto');
const config = require('../config/index');

const verifyGithubSignature = (req, res, next) => {
    const signature = req.headers['x-hub-signature-256'];
    const secret = config.github.webhookSecret; 

    if (!signature) {
        return res.status(401).send('No signature found');
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');

    if (signature !== digest) {
        console.error(' Invalid Signature! Access Denied.');
        return res.status(403).send('Invalid signature');
    }

    console.log(' GitHub Signature Verified!');
    next();
};

module.exports = { verifyGithubSignature };