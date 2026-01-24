// Query imports must be relative
import { groq } from "next-sanity";
import { authorFragment } from "./documents/author";
import { card2UpQuery } from "./modules/card/card-2-up";
import { card3UpQuery } from "./modules/card/card-3-up";
import { cardCollapsibleQuery } from "./modules/card/card-collapsible";
import { cardGridMarqueeQuery } from "./modules/card/card-grid-marquee";
import { cardListQuery } from "./modules/card/card-list";
import { cardPricingQuery } from "./modules/card/card-pricing";
import { driverCtaQuery } from "./modules/driver/driver-cta";
import { driverListQuery } from "./modules/driver/driver-list";
import { heroPrimaryQuery } from "./modules/hero/hero-primary";
import { heroQuaternaryQuery } from "./modules/hero/hero-quaternary";
import { heroQuinaryQuery } from "./modules/hero/hero-quinary";
import { heroSecondaryQuery } from "./modules/hero/hero-secondary";
import { heroTertiaryQuery } from "./modules/hero/hero-tertiary";
import { imageTextTabQuery } from "./modules/image-text/image-text-tab";
import { imageTextTimelineQuery } from "./modules/image-text/image-text-timeline";
import { listAccordionQuery } from "./modules/list/list-accordion";
import { listCta3UpQuery } from "./modules/list/list-cta-3-up";
import { listGridLogoQuery } from "./modules/list/list-grid-logo";
import { listIconScrollQuery } from "./modules/list/list-icon-scroll";
import { listImageScrollQuery } from "./modules/list/list-image-scroll";
import { listMetricQuery } from "./modules/list/list-metric";
import { listMultiAccordionQuery } from "./modules/list/list-multi-accordion";
import { listTeamQuery } from "./modules/list/list-team";
import { listTextQuery } from "./modules/list/list-text";
import { marqueeQuery } from "./modules/marquee/marquee";
import { fullImageQuery } from "./modules/media/full-image";
import { fullVideoQuery } from "./modules/media/full-video";
import { patternQuery } from "./modules/media/pattern";
import { infographicModelQuery } from "./modules/misc/infographic-model";
import { tableComparisonQuery } from "./modules/table/table-comparison";
import { tableDataFeedQuery } from "./modules/table/table-data-feed";
import { tableLogoQuery } from "./modules/table/table-logo";
import { tableMultiCtaQuery } from "./modules/table/table-multi-cta";
import { portableTextContentHighlightQuery } from "./modules/text/portable-text-content-highlight";
import { text2ColQuery } from "./modules/text/text-2-col";
import { textCta2ColQuery } from "./modules/text/text-cta-2-col";
import { textDialQuery } from "./modules/text/text-dial";
import { textLogoQuery } from "./modules/text/text-logo";
import { textQuoteQuery } from "./modules/text/text-quote";
import { imageFragment, logoFragment } from "./shared/image";
import { linkArrayFragment, linksFragment } from "./shared/link";
import { metaQuery } from "./shared/meta";
import { portableTextFragment } from "./shared/portable-text";
import { portableTextPlainFragment } from "./shared/portable-text-plain";

// Reusable blocks query fragment - used by all page types
// @sanity-typegen-ignore
const blocksQuery = groq`
  ${heroPrimaryQuery},
  ${heroSecondaryQuery},
  ${heroTertiaryQuery},
  ${heroQuaternaryQuery},
  ${heroQuinaryQuery},
  ${fullImageQuery},
  ${fullVideoQuery},
  ${text2ColQuery},
  ${textQuoteQuery},
  ${listIconScrollQuery},
  ${listImageScrollQuery},
  ${cardGridMarqueeQuery},
  ${textCta2ColQuery},
  ${patternQuery},
  ${driverCtaQuery},
  ${driverListQuery},
  ${listMetricQuery},
  ${listAccordionQuery},
  ${listMultiAccordionQuery},
  ${card3UpQuery},
  ${cardCollapsibleQuery},
  ${cardListQuery},
  ${listCta3UpQuery},
  ${cardPricingQuery},
  ${listGridLogoQuery},
  ${tableComparisonQuery},
  ${tableLogoQuery},
  ${tableMultiCtaQuery},
  ${marqueeQuery},
  ${listTextQuery},
  ${card2UpQuery},
  ${imageTextTimelineQuery},
  ${infographicModelQuery},
  ${imageTextTabQuery},
  ${textLogoQuery},
  ${listTeamQuery},
  ${textDialQuery},
  ${portableTextContentHighlightQuery},
  ${tableDataFeedQuery},
`;

// TypeGen-only query to generate clean types for all page types
// This tells TypeGen that page, platform, and any future page types all have identical block structures

const topicsFragment = groq`topics[]->{
  _id,
  title,
  slug,
  ${logoFragment}
}`;

const categoriesFragment = groq`categories[]->{
  _id,
  title,
  ${imageFragment},
  slug
}`;

export const RESOURCE_CATEGORY_COUNT_QUERY = groq`
{
  "totalPostCount": count(*[_type == $type]),
  "currentCategoryPostCount": count(*[_type == $type && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]),
  "categories": *[
    _type == select(
      $type == "case-study" => "case-study-category",
      "resource-category"
    ) &&
    count(*[_type == $type && ^._id in categories[]._ref]) > 0
  ] | order(title asc) {
    _id,
    title,
    slug,
    "count": count(*[_type == $type && ^._id in categories[]._ref  && ($topic == null || $topic in topics[]->slug.current)])
  }
}
`;

export const RESOURCE_TOPICS_COUNT_QUERY = groq`
{
  "totalTopicCount": count(*[_type == $type]),
  "currentTopicPostCount": count(*[_type == $type && ($topic == null || $topic in topics[]->slug.current) && ($category == null || $category in categories[]->slug.current)]),
"topics": *[
  _type == "resource-topic" &&
  count(*[_type == $type && ^._id in topics[]._ref]) > 0
] | order(title asc) {
  _id,
  title,
  slug,
  ${logoFragment},
  "count": count(*[_type == $type && ^._id in topics[]._ref && ($category == null || $category in categories[]->slug.current)])
}
}
`;

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _type,
    blocks[]{
      ${blocksQuery}
    },
    ${metaQuery}
  }
`;

// @sanity-typegen-ignore
export const PAGE_TYPE_QUERY = groq`
  *[_type == $pageType && slug.current == $slug][0]{
    _type,
    title,
    description,
    slug,
    blocks[]{
      ${blocksQuery}
    },
    ${metaQuery},
  }
`;

export const PAGES_SLUGS_QUERY = groq`*[_type == $pageType && defined(slug)]{slug}`;

export const ORGANIZATION_QUERY = groq`
  *[_type == "organization"][0]{
    organization {
      ...,
      ${logoFragment}
    }
  }
`;

// BLOG INDEX PAGE
export const BLOG_QUERY = groq`
  *[_type == "post-index"][0]{
    _id,
    _type,
    title,
    description,
    slug,
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    featuredPost->{
      _id,
      _type,
      _createdAt,
      slug,
      title[]{
        ${portableTextPlainFragment}
      },
      description,
      publishedDate,
      ${imageFragment},
      ${authorFragment},
      ${topicsFragment},
      ${categoriesFragment},
      "link": ${linkArrayFragment}
    },
    "posts": *[_type == "post" && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      title[]{
        ${portableTextPlainFragment}
      },
      slug,
      description,
      publishedDate,
      "link": ${linkArrayFragment},
      ${imageFragment},
      ${authorFragment},
      ${categoriesFragment},
      ${topicsFragment},
    }
  }
`;

export const BLOG_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    slug,
    title[]{
      ${portableTextPlainFragment}
    },
    description,
    publishedDate,
    content[]{
      ${portableTextFragment},
    },
    ${authorFragment},
    ${topicsFragment},
    ${categoriesFragment},
    ${imageFragment},
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`;

export const BLOG_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;

// CASE STUDIES INDEX PAGE
export const CASE_STUDIES_QUERY = groq`
  *[_type == "case-study-index"][0]{
    _id,
    _type,
    title,
    description,
    slug,
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    featuredPost->{
      _id,
      _type,
      _createdAt,
      slug,
      title[]{
        ${portableTextPlainFragment}
      },
      description,
      publishedDate,
      ${imageFragment},
      ${authorFragment},
      ${categoriesFragment},
      ${topicsFragment},
      "link": ${linkArrayFragment}
    },
      "posts": *[_type == "case-study" && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      slug,
      title[]{
        ${portableTextPlainFragment}
      },
      description,
      publishedDate,
      "link": ${linkArrayFragment},
      ${imageFragment},
      ${authorFragment},
      ${categoriesFragment},
      ${topicsFragment},
    }
  }
`;

export const CASE_STUDIES_SLUG_QUERY = groq`
  *[_type == "case-study" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    slug,
    title[]{
        ${portableTextPlainFragment}
      },
    description,
    publishedDate,
    content[]{
      ${portableTextFragment},
    },
    ${authorFragment},
    ${imageFragment},
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`;

export const CASE_STUDIES_SLUGS_QUERY = groq`*[_type == "case-study" && defined(slug)]{slug}`;

// RESOURCES INDEX PAGE
export const RESOURCE_QUERY = groq`
  *[_type == "resource-index"][0]{
    _id,
    _type,
    title,
    description,
    slug,
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "posts": *[_type == "resource" && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      slug,
      title[]{
        ${portableTextPlainFragment}
      },
      description,
      publishedDate,
      "link": ${linkArrayFragment},
      ${imageFragment},
      ${authorFragment},
      ${categoriesFragment},
      ${topicsFragment},
    }
  }
`;

export const RESOURCE_SLUG_QUERY = groq`
  *[_type == "resource" && slug.current == $slug][0]{
    _id,
    _createdAt,
    slug,
    _type,
    isGated,
    formId,
    description,
    title[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
    publishedDate,
    content[]{
      ${portableTextFragment},
    },
    ${authorFragment},
    ${imageFragment},
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`;

export const RESOURCE_SLUGS_QUERY = groq`*[_type == "resource" && defined(slug)]{slug}`;

// Events

// BLOG INDEX PAGE
export const EVENTS_QUERY = groq`
  *[_type == "events-index"][0]{
    _id,
    _type,
    title[]{
      ${portableTextPlainFragment}
    },
    description,
    slug,
    "eventLink": ${linkArrayFragment},
    "link": ${linkArrayFragment},
    location,
    type,
    startDate,
    endDate,
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    featuredPost->{
      _id,
      _type,
      _createdAt,
      slug,
      title[]{
        ${portableTextPlainFragment}
      },
      description,
      publishedDate,
      ${imageFragment},
      ${authorFragment},
      ${topicsFragment},
      ${categoriesFragment},
      "link": ${linkArrayFragment}
    },
    "posts": *[_type == "event" && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      title[]{
        ${portableTextPlainFragment}
      },
      slug,
      description,
      publishedDate,
      "link": ${linkArrayFragment},
      ${imageFragment},
      ${authorFragment},
      ${categoriesFragment},
      ${topicsFragment},
    }
  }
`;

export const EVENTS_SLUG_QUERY = groq`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    _createdAt,
    slug,
    _type,
    isGated,
    formId,
    description,
    "eventLink": ${linkArrayFragment},
    "link": ${linkArrayFragment},
    location,
    type,
    startDate,
    endDate,
    title[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
    publishedDate,
    content[]{
      ${portableTextFragment},
    },
    ${authorFragment},
    ${imageFragment},
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`;

export const EVENTS_SLUGS_QUERY = groq`*[_type == "event" && defined(slug)]{slug}`;
