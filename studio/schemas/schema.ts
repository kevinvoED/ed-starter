// biome-ignore assist/source/organizeImports: keep imports in order
import type { SchemaTypeDefinition } from "sanity";
// Custom Components
import { createdAtType } from "@/components/created-at";
// Pages
import page from "@/schemas/pages/page";
import blogPost from "@/schemas/pages/blog/blog-post";
import blogIndex from "@/schemas/pages/blog/blog-index";
import caseStudiesIndex from "@/schemas/pages/case-studies/case-studies-index";
import caseStudy from "@/schemas/pages/case-studies/case-study";
import platformChild from "@/schemas/pages/platform/platform-child";
import platformIndex from "@/schemas/pages/platform/platform-index";
// Documents
import globalModuleLibrary from "@/schemas/documents/global-module-library";
import author from "@/schemas/documents/author";
import configuration from "@/schemas/documents/configuration";
import footer from "@/schemas/documents/footer";
import navbar from "@/schemas/documents/navbar";
import organization from "@/schemas/documents/organization";
import blogCategory from "@/schemas/pages/blog/blog-category";
import contentTopic from "@/schemas/pages/content-topic";
import banner from "@/schemas/documents/banner";
// Objects
import link from "@/schemas/objects/link";
// Modules
import spacer from "@/schemas/modules/miscellaneous/spacer";
import heroPrimary from "@/schemas/modules/hero/hero-primary";
import imageExample from "@/schemas/modules/image/image-example";
import richText from "@/schemas/modules/text/rich-text";
import portableText from "@/schemas/objects/portable-text";
import marquee from "@/schemas/modules/miscellaneous/marquee";
import cardExample from "@/schemas/modules/card/card-example";
import driverExample from "@/schemas/modules/driver/driver-example";
import listExample from "@/schemas/modules/list/list-example";
import tableExample from "@/schemas/modules/table/table-example";
import textExample from "@/schemas/modules/text/text-example";
import fullImage from "@/schemas/modules/media/full-image";
import fullVideo from "@/schemas/modules/media/full-video";
import globalModule from "@/schemas/modules/miscellaneous/global-module";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Custom Components
    createdAtType,
    // Pages
    page,
    contentTopic,
    blogIndex,
    blogPost,
    blogCategory,
    caseStudiesIndex,
    caseStudy,
    platformIndex,
    platformChild,
    // Documents
    navbar,
    footer,
    organization,
    configuration,
    author,
    banner,
    globalModuleLibrary,
    // Objects
    link,
    portableText,
    // Modules
    globalModule,
    spacer,
    heroPrimary,
    marquee,
    richText,
    fullImage,
    fullVideo,
    // Remove example modules
    imageExample,
    cardExample,
    driverExample,
    listExample,
    tableExample,
    textExample,
  ],
};
