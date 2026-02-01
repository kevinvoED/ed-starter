import { sortBy } from "es-toolkit";

/*
 * After creating your new page-related schema, add it to this list.
 * These schemas are primarily used by `Link` and `Cta`-related components and queries.
 * Note that you should not add any module-related schemas here.
 * This is only for page-related schemas.
 */
export const relationTypes = sortBy(
  [
    { type: "page" },
    { type: "blog-index" },
    { type: "blog-post" },
    { type: "case-studies-index" },
    { type: "case-study" },
    { type: "platform-index" },
    { type: "platform-child" },
  ],
  ["type"],
);

/*
 * After creating your new module-related schema, add it to this list.
 * These schemas are used by the `ModuleBuilder` component.
 * Note that you should not add any page-related schemas here.
 * This is only for module-related schemas.
 */
export const moduleBlocks = sortBy([{ type: "hero-primary" }], ["type"]);

/*
 * In Sanity Studio, you can group modules together when adding a new module to any page.
 * If your new schema fits into any pre-existing groups, then add it.
 * Otherwise, create a new group for your schema. Please try to be as generic as possible.
 * Alternatively, you can put it into the `Miscellaneous` group if it doesn't fit into any group.
 */
export const moduleGroups = sortBy(
  [
    {
      name: "hero",
      of: ["hero-primary"],
    },
  ],
  ["name"],
);
