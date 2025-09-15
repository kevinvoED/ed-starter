import { person } from '@/schemas/documents/person';
import { post } from '@/schemas/documents/post';
import { callToAction } from '@/schemas/objects/callToAction';
import { cta } from '@/schemas/objects/cta';
import { infoSection } from '@/schemas/objects/infoSection';
import { portableText } from '@/schemas/objects/portableText';
import { portableTextPlain } from '@/schemas/objects/portableTextPlain';
import { seo } from '@/schemas/objects/seo';
import { page } from '@/schemas/page';
import { settings } from '@/schemas/singletons/settings';

import type { SchemaTypeDefinition } from 'sanity';

/*
 * Export an array of all the schema types.
 * This array is used in `sanity.config.ts`.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects (order matters for references)
  cta, // Move this before portable-text
  seo,
  infoSection,
  callToAction,
  portableText, // This references cta, so cta must come first
  portableTextPlain,
];
