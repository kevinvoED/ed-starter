import {page} from '@/schemaTypes/documents/page'
import {person} from '@/schemaTypes/documents/person'
import {post} from '@/schemaTypes/documents/post'
import {blockContent} from '@/schemaTypes/objects/blockContent'
import {callToAction} from '@/schemaTypes/objects/callToAction'
import {infoSection} from '@/schemaTypes/objects/infoSection'
import {link} from '@/schemaTypes/objects/link'
import {settings} from '@/schemaTypes/singletons/settings'

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
  infoSection,
  callToAction,
  link,
]
