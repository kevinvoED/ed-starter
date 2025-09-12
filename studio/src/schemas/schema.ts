import { page } from '@/schemas/documents/page';
import { person } from '@/schemas/documents/person';
import { post } from '@/schemas/documents/post';
import { blockContent } from '@/schemas/objects/blockContent';
import { callToAction } from '@/schemas/objects/callToAction';
import { infoSection } from '@/schemas/objects/infoSection';
import { link } from '@/schemas/objects/link';
import { seo } from '@/schemas/objects/seo';
import { settings } from '@/schemas/singletons/settings';

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  seo,
  infoSection,
  callToAction,
  link,
];
