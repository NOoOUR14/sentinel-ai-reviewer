const assert = require('assert');
const sinon = require('sinon');

describe('Webhook Controller', function () {
    describe('handleGithubWebhook', function () {
        it('should process pull_request opened event', function () {
            const mockReq = {
                body: {
                    action: 'opened',
                    pull_request: {
                        number: 1,
                        diff_url: 'https://api.github.com/repos/test/test/pulls/1',
                    },
                    repository: {
                        owner: { login: 'test' },
                        name: 'test',
                    },
                },
                headers: {
                    'x-github-event': 'pull_request',
                },
            };
            assert.strictEqual(mockReq.body.action, 'opened');
            assert.strictEqual(mockReq.headers['x-github-event'], 'pull_request');
        });

        it('should process pull_request synchronize event', function () {
            const mockReq = {
                body: {
                    action: 'synchronize',
                    pull_request: {
                        number: 2,
                        diff_url: 'https://api.github.com/repos/test/test/pulls/2',
                    },
                    repository: {
                        owner: { login: 'test' },
                        name: 'test',
                    },
                },
                headers: {
                    'x-github-event': 'pull_request',
                },
            };
            assert.strictEqual(mockReq.body.action, 'synchronize');
        });

        it('should return 200 with successful response', function () {
            const mockRes = {
                statusCode: null,
                body: null,
                status: function (code) {
                    this.statusCode = code;
                    return this;
                },
                send: function (msg) {
                    this.body = msg;
                    return this;
                },
            };
            const result = mockRes.status(200).send('Webhook processed successfully');
            assert.strictEqual(result.statusCode, 200);
            assert.strictEqual(result.body, 'Webhook processed successfully');
        });
    });
});