/*
 * All imports involving GROQ queries must use relative imports.
 * Absolute imports are currently not supported by Sanity TypeGen and will cause typegen errors.
 * Add your custom module schema query fragments to the modulesFragment query.
 */

import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  metaFragment,
  portableTextFragment,
  titleFragment,
} from "./fragments/fragments";
import { FN_LOGO, GROQ_FUNCTIONS } from "./functions/functions";
import { HERO_PRIMARY_QUERY } from "./modules/hero/hero-primary";

/*
 * ====================================================
 * ============= MODULE-BUILDER FRAGMENT ==============
 * ====================================================
 */

// @sanity-typegen-ignore
export const modulesFragment = defineQuery(`
  modules[]{
    ${HERO_PRIMARY_QUERY}
  }
`);

/*
 * ====================================================
 * ================== MISC. QUERIES ===================
 * ====================================================
 */

export const ORGANIZATION_QUERY = defineQuery(`
  ${FN_LOGO}

  *[_type == "organization"][0]{
    organization {
      ...,
      "logo": fn::logo(logo),
    }
  }
`);

/*
 * ====================================================
 * =================== PAGE QUERIES ===================
 * ====================================================
 */
export const PAGE_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "page" && slug.current == $slug][0]{
    _type,
    ${modulesFragment},
    ${metaFragment}
  }
`);

// @sanity-typegen-ignore
export const PAGE_SLUG_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == $pageType && slug.current == $slug][0]{
    _type,
    ${modulesFragment},
    ${metaFragment},
  }
`);

export const PAGES_SLUGS_QUERY = defineQuery(
  "*[_type == $pageType && defined(slug)]{slug}",
);

/*
 * ====================================================
 * =============== CONTENT-TYPE QUERIES ===============
 * ====================================================
 */

const selectContentType = `
  select(
        $contentType == "blog-index" => "blog-post",
        $contentType == "case-studies-index" => "case-study"
  )
`;

export const RESOURCE_CATEGORY_COUNT_QUERY = defineQuery(`
{
  "totalPostCount": count(*[_type == $type]),
  "currentCategoryPostCount": count(*[_type == $type && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]),
  "categories": *[
    _type == select(
      $type == "case-study" => "case-study-category",
      $type == "news-article" => "news-category",
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
`);

export const GET_CONTENT_TYPE_INDEX_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == $contentType][0]{
    _type,
    slug,
    ${titleFragment},
    ${descriptionFragment},
    ${metaFragment},
    ${modulesFragment},
    "categoryFilter": {
      "totalPostCount": count(*[_type == ${selectContentType}]),
      "currentCategoryPostCount": count(*[_type == ${selectContentType} && ($category == null || $category in categories[]->slug.current) && ($topic == null || $topic in topics[]->slug.current)]),
      "categories": *[_type ==  select(
        $contentType == "blog-index" => "blog-category")] {
        _id,
        "slug": select(
          $contentType == "blog-index" => "/blog/" + slug.current),
        ${titleFragment},
        "count": count(*[_type == "blog-post" && references(^._id)])
      },
    },
    "posts": *[_type == ${selectContentType} && ($topic == null || $topic in topics[]->slug.current)] | order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      ${titleFragment},
      slug,
      description,
      publishedDate,
      category->{
        _id,
        _type,
        slug,
        title,
      },
      contentTopic->{
        _id,
        _type,
        slug,
        title,
      },
      ${linkFragment},
      ${imageFragment},
    }
  }
`);

export const GET_CONTENT_TYPE_SLUG_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == ${selectContentType} && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    slug,
    publishedDate,
    ${metaFragment},
    ${modulesFragment},
    ${titleFragment},
    ${descriptionFragment},
    ${imageFragment},
    ${portableTextFragment},
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
  }
`);

export const GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY = defineQuery(
  "*[_type == $contentType && defined(slug)]{slug}",
);
