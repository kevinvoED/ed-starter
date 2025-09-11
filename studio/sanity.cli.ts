/**
 * Sanity CLI Configuration
 * This file configures the Sanity CLI tool with project-specific settings
 * and customizes the Vite bundler configuration.
 * Learn more: https://www.sanity.io/docs/cli
 */

import { resolve } from 'path';
import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '<your project ID>';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: process.env.SANITY_STUDIO_STUDIO_HOST || '',
  autoUpdates: true,
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/schemaTypes': resolve(__dirname, './src/schemaTypes'),
        '@/plugins': resolve(__dirname, './src/plugins'),
        '@/lib': resolve(__dirname, './src/lib'),
      },
    },
  },
});
