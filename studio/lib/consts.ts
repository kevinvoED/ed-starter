// Note that when creating your pages, there are a few rules to follow:
// 1. The homepage's slug in the CMS must be `index`
// 2. Index or landing-type pages should be suffixed with `-index` (e.g. `blog-index`)
// 3. For child-type pages, their route should end with a `/`
export const RELATION_SCHEMA_TYPES = [
  { schemaType: "page", route: "/" },
  { schemaType: "blog-index", route: "/blog" },
  { schemaType: "blog-post", route: "/blog/" },
  { schemaType: "platform-index", route: "/platform" },
  { schemaType: "platform-child", route: "/platform/" },
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
  "navbar",
  "footer",
  "configuration",
  "organization",
  "blog-index",
  "platform-index",
]);

export const COLOR_OPTIONS = [
  { label: "Light", value: "#ffffff" },
  { label: "Dark", value: "#333333" },
  { label: "Brand", value: "#ca786d" },
  { label: "Accent", value: "#626754" },
  { label: "Custom...", value: "custom" },
];
