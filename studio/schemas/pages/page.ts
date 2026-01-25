import { createPageType } from "./pageBuilder";

/*
 * This is the most generic base-level page type.
 * This schema type would be used for standalone pages, and has no related child pages.
 * This is paired with the following page.tsx files:
 * Homepage - /frontend/app/(main)/page.tsx
 * [slug] pages - /frontend/app/(main)/[slug]/page.tsx
 */

export default createPageType({
  name: "page",
  title: "Page",
});
