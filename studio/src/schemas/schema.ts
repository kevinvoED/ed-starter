// biome-ignore assist/source/organizeImports: keep order
import { person } from '@/schemas/documents/person';
import { post } from '@/schemas/documents/post';
import { callToAction } from '@/schemas/objects/callToAction';
import { configuration } from '@/schemas/objects/configuration';
import { redirect } from '@/schemas/objects/redirect';
import { rewrite } from '@/schemas/objects/rewrite';
import { cta } from '@/schemas/objects/cta';
import { infoSection } from '@/schemas/objects/infoSection';
import { portableText } from '@/schemas/objects/portableText';
import { portableTextPlain } from '@/schemas/objects/portableTextPlain';
import { seo } from '@/schemas/objects/seo';
import { page } from '@/schemas/page';
import { settings } from '@/schemas/objects/settings';

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
  // Objects (order matters for both linear or cicrcular references)
  cta,
  seo,
  infoSection,
  callToAction,
  portableText,
  portableTextPlain,
  configuration,
  redirect,
  rewrite,
];
