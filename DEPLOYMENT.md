# Sanity Studio Deployment Guide

This guide explains how to set up automatic deployment for your Sanity Studio using GitHub Actions.

## Prerequisites

1. A Sanity project with Studio configured
2. A GitHub repository
3. A Sanity authentication token for deployment

## Required Environment Variables

You need to set up these secrets in your GitHub repository:

### 1. SANITY_STUDIO_PROJECT_ID
- Your Sanity project ID
- Find this in your [Sanity dashboard](https://www.sanity.io/manage)
- Example: `abc123def`

### 2. SANITY_STUDIO_DATASET  
- Your dataset name (usually "production")
- Example: `production`

### 3. SANITY_STUDIO_HOSTNAME
- Your desired studio hostname for deployment
- This will be your studio URL: `https://your-hostname.sanity.studio`
- Example: `my-awesome-studio`

### 4. SANITY_AUTH_TOKEN
- Authentication token for deployment
- **This is the most important secret for CI/CD**

## How to Get Your Sanity Auth Token

1. Go to [Sanity Manage](https://www.sanity.io/manage)
2. Select your project
3. Go to **API** tab
4. Click **Tokens**
5. Click **Add API token**
6. Give it a name like "GitHub Actions Deploy"
7. Set permissions to **Deploy Studio** (or Editor if Deploy Studio isn't available)
8. Copy the token immediately (you won't be able to see it again)

## Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add each of the four secrets listed above

## Local Development Setup

Create a `.env.local` file in your `studio/` directory:

```bash
# Copy these values to studio/.env.local
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2024-10-31
SANITY_STUDIO_HOSTNAME=your-studio-hostname
SANITY_STUDIO_PREVIEW_URL=http://localhost:3000

# Only needed for deployment (not for local development)
SANITY_AUTH_TOKEN=your-auth-token
```

## How the Pipeline Works

The GitHub Actions workflow will:

1. **Trigger** on pushes to `main`/`master` branch when files in `studio/` directory change
2. **Check** that all required secrets are configured
3. **Install** dependencies using pnpm
4. **Deploy** the studio using `sanity deploy`

## Manual Deployment

You can also trigger deployment manually:

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Deploy Sanity Studio** workflow
4. Click **Run workflow**

## Troubleshooting

### "SANITY_AUTH_TOKEN secret is not set"
- Make sure you've created an API token in Sanity dashboard
- Verify the token is added to GitHub secrets with the exact name `SANITY_AUTH_TOKEN`

### "Permission denied"
- Check that your API token has deployment permissions
- Try creating a new token with "Editor" permissions

### "Project not found"
- Verify your `SANITY_STUDIO_PROJECT_ID` is correct
- Check that the project exists and you have access to it

### "Hostname already taken"
- Choose a different `SANITY_STUDIO_HOSTNAME`
- Check available hostnames in your Sanity dashboard

## Testing Locally

Before pushing, you can test deployment locally:

```bash
cd studio
sanity deploy
```

This will prompt you to log in and deploy the studio. 