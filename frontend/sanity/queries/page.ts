// Query imports must be relative
import { groq } from "next-sanity";
import { heroPrimaryQuery } from "./modules/hero/hero-primary";
import { imageFragment, logoFragment } from "./shared/image";
import { linkArrayFragment } from "./shared/link";
import { metaQuery } from "./shared/meta";
import { portableTextFragment } from "./shared/portable-text";
import { portableTextPlainFragment } from "./shared/portable-text-plain";

// Reusable blocks query fragment - used by all page types
// @sanity-typegen-ignore
const blocksQuery = groq`
  ${heroPrimaryQuery},
`;

// TypeGen-only query to generate clean types for all page types
// This tells TypeGen that page, platform, and any future page types all have identical block structures

// const topicsFragment = groq`topics[]->{
//   _id,
//   title,
//   slug,
//   ${logoFragment}
// }`;

// const categoriesFragment = groq`categories[]->{
//   _id,
//   title,
//   ${imageFragment},
//   slug
// }`;

// export const RESOURCE_CATEGORY_COUNT_QUERY = groq`
// {
//   "totalPostCount": count(*[_type == $type]),
//   "currentCategoryPostCount": count(*[_type == $type && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]),
//   "categories": *[
//     _type == select(
//       $type == "case-study" => "case-study-category",
//       "resource-category"
//     ) &&
//     count(*[_type == $type && ^._id in categories[]._ref]) > 0
//   ] | order(title asc) {
//     _id,
//     title,
//     slug,
//     "count": count(*[_type == $type && ^._id in categories[]._ref  && ($topic == null || $topic in topics[]->slug.current)])
//   }
// }
// `;

// export const RESOURCE_TOPICS_COUNT_QUERY = groq`
// {
//   "totalTopicCount": count(*[_type == $type]),
//   "currentTopicPostCount": count(*[_type == $type && ($topic == null || $topic in topics[]->slug.current) && ($category == null || $category in categories[]->slug.current)]),
// "topics": *[
//   _type == "resource-topic" &&
//   count(*[_type == $type && ^._id in topics[]._ref]) > 0
// ] | order(title asc) {
//   _id,
//   title,
//   slug,
//   ${logoFragment},
//   "count": count(*[_type == $type && ^._id in topics[]._ref && ($category == null || $category in categories[]->slug.current)])
// }
// }
// `;

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
    ${imageFragment},
    ${metaQuery},
    blocks[]{
      ${blocksQuery}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`;

export const BLOG_SLUGS_QUERY = groq`*[_type == "post" && defined(slug)]{slug}`;
