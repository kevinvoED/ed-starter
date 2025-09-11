// Learn more: https://www.sanity.io/docs/configuration

import {defineConfig} from 'sanity'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {assist} from '@sanity/assist'
import {schemaTypes} from './src/schemaTypes/index'
import {structure} from '@/plugins/structure'
import {presentation} from '@/plugins/presentation'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  title: 'ED Starter Kit',
  projectId,
  dataset,
  plugins: [structure, media(), presentation, unsplashImageAsset(), assist(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
