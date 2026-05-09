exports.handleGithubWebhook = (req, res) => {
    try {
        const event = req.headers['x-github-event'];
        const payload = req.body;

        if(req.headers['x-github-event']==='pull_request') {
            console.log('Received Pull Request Event:');
            const action = payload.action;
            const repName = payload.repository.full_name;

            console.log(`Action: ${action}on repo: ${repName}`);
        }
        res.status(200).send('Webhook received successfully');
    } catch (error) {
        console.error('Error handling webhook:', error.message);
        res.status(500).send('Internal Server Error');
    }
};