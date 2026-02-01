// biome-ignore assist/source/organizeImports: keep imports in order
import type { SchemaTypeDefinition } from "sanity";
// Custom Components
import { createdAtType } from "@/components/created-at";
// Pages
import page from "@/schemas/pages/page";
import blogPost from "@/schemas/pages/blog/blog-post";
import blogIndex from "@/schemas/pages/blog/blog-index";
import platformChild from "@/schemas/pages/platform/platform-child";
import platformIndex from "@/schemas/pages/platform/platform-index";
// Documents
import author from "@/schemas/documents/author";
import configuration from "@/schemas/documents/configuration";
import footer from "@/schemas/documents/footer";
import navbar from "@/schemas/documents/navbar";
import organization from "@/schemas/documents/organization";
// Objects
import link from "@/schemas/objects/link";
// Modules
import heroPrimary from "@/schemas/modules/hero/hero-primary";
import portableText from "@/schemas/objects/portable-text";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Custom Components
    createdAtType,
    // Pages
    page,
    blogIndex,
    platformIndex,
    platformChild,
    // Documents
    navbar,
    footer,
    organization,
    configuration,
    author,
    blogPost,
    // Objects
    link,
    portableText,
    // Modules
    heroPrimary,
  ],
};
