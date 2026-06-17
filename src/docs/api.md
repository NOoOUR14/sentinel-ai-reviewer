# Sentinel AI Code Reviewer - API Documentation

## Overview
Sentinel AI automatically reviews GitHub Pull Requests using Google's Gemini AI. It analyzes code diffs for security vulnerabilities, code quality issues, and performance improvements, then posts the review as a comment on the PR.

## Architecture

```
GitHub Webhook Event
    |
    v
[githubAuth.js] -> Verifies HMAC-SHA256 signature
    |
    v
[webhook.controller.js] -> Fetches diff, triggers AI analysis
    |
    v
[ai.service.js] -> Sends diff to Gemini AI for review
    |
    v
[github.service.js] -> Posts review comment on PR
    |
    v
[jobs/reviewProcessor.js] -> Persists review to MongoDB
```

## Endpoints

### POST /api/webhooks
Receives GitHub webhook events.

**Headers:**
- `x-github-event`: Event type (pull_request, push, issues)
- `x-hub-signature-256`: HMAC-SHA256 signature for verification
- `Content-Type`: application/json

**Payload (pull_request event):**
```json
{
    "action": "opened|synchronize",
    "pull_request": {
        "number": 1,
        "diff_url": "https://api.github.com/repos/owner/repo/pulls/1",
        "title": "PR Title"
    },
    "repository": {
        "owner": { "login": "owner" },
        "name": "repo"
    }
}
```

**Response:**
- `200 OK`: Webhook processed successfully
- `401 Unauthorized`: No signature found
- `403 Forbidden`: Invalid signature
- `500 Internal Server Error`: Processing failed

### GET /
Health check endpoint.

**Response:**
- `200 OK`: "Sentinel AI Server is Running!"

## Data Models

### Repository
- `name`: Repository name
- `owner`: Repository owner
- `fullName`: Full repository name (owner/repo)
- `isActive`: Whether the repo is actively monitored

### PullRequest
- `githubPrId`: GitHub PR number
- `title`: PR title
- `diffUrl`: URL to the diff
- `state`: open | closed | merged

### Review
- `status`: pending | completed | failed
- `summary`: Short summary of the review
- `securityIssues`: List of security vulnerabilities found
- `qualityIssues`: List of code quality issues found
- `performanceIssues`: List of performance issues found
- `rawAnalysis`: Full AI analysis text

## Configuration (.env)
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://...
GITHUB_TOKEN=your_personal_access_token
GITHUB_WEBHOOK_SECRET=a_strong_random_string
GEMINI_API_KEY=your_gemini_api_key