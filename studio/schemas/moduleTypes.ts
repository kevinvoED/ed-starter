import { sortBy } from "es-toolkit";

// List of page relations
export const relationTypes = sortBy(
  [
    { type: "page" },
    { type: "post" },
    { type: "post-index" },
    { type: "case-study" },
    { type: "case-study-index" },
    { type: "platform-index" },
    { type: "platform-child" },
    { type: "resource" },
    { type: "resource-index" },
    { type: "solutions-child" },
    { type: "event" },
    { type: "events-index" },
  ],
  ["type"],
);

// Add ALL new module blocks here as it is used by most pages; automatically sorted alphabetically
export const moduleBlocks = sortBy(
  [
    { type: "hero-primary" },
    { type: "hero-secondary" },
    { type: "hero-tertiary" },
    { type: "hero-quaternary" },
    { type: "hero-quinary" },
    { type: "full-image" },
    { type: "text-2-col" },
    { type: "list-icon-scroll" },
    { type: "pattern" },
    { type: "text-cta-2-col" },
    { type: "driver-cta" },
    { type: "driver-list" },
    { type: "list-metric" },
    { type: "list-image-scroll" },
    { type: "list-accordion" },
    { type: "text-quote" },
    { type: "list-multi-accordion" },
    { type: "list-cta-3-up" },
    { type: "list-grid-logo" },
    { type: "table-comparison" },
    { type: "table-multi-cta" },
    { type: "table-logo" },
    { type: "marquee" },
    { type: "list-text" },
    { type: "full-video" },
    { type: "image-text-timeline" },
    { type: "infographic-model" },
    { type: "image-text-tab" },
    { type: "text-logo" },
    { type: "list-team" },
    { type: "text-dial" },
    { type: "portable-text-content-highlight" },
    { type: "table-data-feed" },
  ],
  ["type"],
);

// Create a separate list of modules if you require a specific subset of modules for a specific page
// export const myCustomPageModuleBlocks = sortBy(
//   [{ type: "my-custom-module" }],
//   ["type"],
// );

// Add new module groupings here; automatically sorted alphabetically by schema name
export const moduleGroups = sortBy(
  [
    {
      name: "hero",
      of: [
        "hero-primary",
        "hero-secondary",
        "hero-tertiary",
        "hero-quaternary",
        "hero-quinary",
      ],
    },
    {
      name: "media",
      of: ["full-image", "full-video", "pattern"],
    },
    {
      name: "text",
      of: [
        "text-2-col",
        "text-cta-2-col",
        "text-quote",
        "text-logo",
        "text-dial",
        "portable-text-content-highlight",
      ],
    },
    {
      name: "list",
      of: [
        "list-icon-scroll",
        "list-metric",
        "list-image-scroll",
        "list-accordion",
        "list-multi-accordion",
        "list-cta-3-up",
        "list-grid-logo",
        "list-text",
        "list-team",
      ],
    },
    {
      name: "driver",
      of: ["driver-cta", "driver-list"],
    },
    {
      name: "table",
      of: [
        "table-comparison",
        "table-multi-cta",
        "table-logo",
        "table-data-feed",
      ],
    },
    {
      name: "marquee",
      of: ["card-grid-marquee", "marquee"],
    },
    {
      name: "image-text",
      of: ["image-text-timeline", "image-text-tab"],
    },
    {
      name: "misc",
      of: ["infographic-model"],
    },
  ],
  ["name"],
);
