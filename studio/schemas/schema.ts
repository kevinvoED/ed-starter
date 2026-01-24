// biome-ignore assist/source/organizeImports: keep imports in order
import type { SchemaTypeDefinition } from "sanity";
// Custom Components
import { createdAtType } from "@/components/created-at";
// Pages
import caseStudyIndex from "@/schemas/pages/case-study-index";
import page from "@/schemas/pages/page";
import platformChild from "@/schemas/pages/platform-child";
import platformIndex from "@/schemas/pages/platform-index";
import postIndex from "@/schemas/pages/post-index";
import resourceIndex from "@/schemas/pages/resource-index";
import solutionsChild from "@/schemas/pages/solutions-child";
// Documents
import author from "@/schemas/documents/author";
import caseStudy from "@/schemas/documents/case-study";
import caseStudyCategory from "@/schemas/documents/case-study-category";
import configuration from "@/schemas/documents/configuration";
import footer from "@/schemas/documents/footer";
import navbar from "@/schemas/documents/navbar";
import organization from "@/schemas/documents/organization";
import post from "@/schemas/documents/post";
import resource from "@/schemas/documents/resource";
import resourceCategory from "@/schemas/documents/resource-category";
import staff from "@/schemas/documents/staff";
// Objects
import link from "@/schemas/objects/link";
import redirect from "@/schemas/objects/redirect";
import rewrite from "@/schemas/objects/rewrite";
// Modules
import event from "@/schemas/documents/event";
import resourceTopic from "@/schemas/documents/resource-topic";
import heroPrimary from "@/schemas/modules/hero/hero-primary";
import portableText from "@/schemas/objects/portable-text";
import eventsIndex from "@/schemas/pages/events-index";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Custom Components
    createdAtType,
    // Pages
    page,
    postIndex,
    caseStudyIndex,
    platformIndex,
    platformChild,
    resourceIndex,
    solutionsChild,
    eventsIndex,
    // Documents
    navbar,
    footer,
    organization,
    configuration,
    author,
    staff,
    post,
    caseStudy,
    caseStudyCategory,
    resource,
    resourceCategory,
    resourceTopic,
    event,
    // Objects
    link,
    redirect,
    rewrite,
    portableText,
    // Modules
    heroPrimary,
  ],
};
