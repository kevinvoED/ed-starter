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
export const moduleBlocks = sortBy([{ type: "hero-primary" }], ["type"]);

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
      of: ["hero-primary"],
    },
  ],
  ["name"],
);
