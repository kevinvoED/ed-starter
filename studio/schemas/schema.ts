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
import driverCta from "@/schemas/modules/driver/driver-cta";
import driverList from "@/schemas/modules/driver/driver-list";
import heroPrimary from "@/schemas/modules/hero/hero-primary";
import heroQuaternary from "@/schemas/modules/hero/hero-quaternary";
import heroQuinary from "@/schemas/modules/hero/hero-quinary";
import heroSecondary from "@/schemas/modules/hero/hero-secondary";
import heroTertiary from "@/schemas/modules/hero/hero-tertiary";
import listAccordion from "@/schemas/modules/list/list-accordion";
import listCta3Up from "@/schemas/modules/list/list-cta-3-up";
import listGridLogo from "@/schemas/modules/list/list-grid-logo";
import listIconScroll from "@/schemas/modules/list/list-icon-scroll";
import listImageScroll from "@/schemas/modules/list/list-image-scroll";
import listMetric from "@/schemas/modules/list/list-metric";
import listMultiAccordion from "@/schemas/modules/list/list-multi-accordion";
import listText from "@/schemas/modules/list/list-text";
import marquee from "@/schemas/modules/marquee/marquee";
import fullImage from "@/schemas/modules/media/full-image";
import fullVideo from "@/schemas/modules/media/full-video";
import pattern from "@/schemas/modules/media/pattern";
import tableComparison from "@/schemas/modules/table/table-comparison";
import tableLogo from "@/schemas/modules/table/table-logo";
import tableMultiCta from "@/schemas/modules/table/table-multi-cta";
import text2Col from "@/schemas/modules/text/text-2-col";
import textCta2Col from "@/schemas/modules/text/text-cta-2-col";
import textQuote from "@/schemas/modules/text/text-quote";
import portableText from "@/schemas/objects/portable-text";
import eventsIndex from "@/schemas/pages/events-index";
import imageTextTimeline from "@/schemas/modules/image-text/image-text-timeline";
import infographicModel from "@/schemas/modules/misc/infographic-model";
import imageTextTab from "@/schemas/modules/image-text/image-text-tab";
import textLogo from "@/schemas/modules/text/text-logo";
import listTeam from "@/schemas/modules/list/list-team";
import textDial from "@/schemas/modules/text/text-dial";
import portableTextContentHighlight from "@/schemas/modules/text/portable-text-content-highlight";
import tableDataFeed from "@/schemas/modules/table/table-data-feed";

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
    // Modules
    portableText,
    heroPrimary,
    heroSecondary,
    heroTertiary,
    heroQuaternary,
    heroQuinary,
    fullImage,
    text2Col,
    listIconScroll,
    textCta2Col,
    pattern,
    driverCta,
    driverList,
    listMetric,
    listImageScroll,
    listAccordion,
    textQuote,
    listMultiAccordion,
    listCta3Up,
    listGridLogo,
    tableComparison,
    tableMultiCta,
    tableLogo,
    marquee,
    listText,
    fullVideo,
    imageTextTimeline,
    infographicModel,
    imageTextTab,
    textLogo,
    listTeam,
    textDial,
    portableTextContentHighlight,
    tableDataFeed,
  ],
};
