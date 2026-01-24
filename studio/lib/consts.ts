// Note that when creating your pages, there are a few rules to follow:
// 1. The homepage's slug in the CMS must be `index`
// 2. Index or landing-type pages should be suffixed with `-index` (e.g. `blog-index`)
// 3. For child-type pages, their route should end with a `/`
export const RELATION_SCHEMA_TYPES = [
  { schemaType: "page", route: "/" },
  { schemaType: "post-index", route: "/blog" },
  { schemaType: "post", route: "/blog/" },
  { schemaType: "case-study-index", route: "/case-studies" },
  { schemaType: "case-study", route: "/case-studies/" },
  { schemaType: "resource-index", route: "/resources" },
  { schemaType: "resource", route: "/resources/" },
  { schemaType: "events-index", route: "/events" },
  { schemaType: "event", route: "/events/" },
  { schemaType: "platform-index", route: "/platform" },
  { schemaType: "platform-child", route: "/platform/" },
  { schemaType: "solutions-child", route: "/solutions/" },
];

// Define the actions that should be available for singleton documents
export const SINGLETON_DOCUMENT_ACTIONS = new Set([
  "publish",
  "discardChanges",
  "restore",
  "unpublish",
]);

// Define the singleton document types
export const SINGLETON_DOCUMENT_TYPES = new Set([
  "post-index",
  "case-study-index",
  "events-index",
  "platform-index",
  "navbar",
  "footer",
  "configuration",
  "organization",
]);
