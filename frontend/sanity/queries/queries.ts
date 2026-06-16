/*
 * All imports involving GROQ queries must use relative imports.
 * Absolute imports are currently not supported by Sanity TypeGen and will cause typegen errors.
 * Add your custom module schema query fragments to the modulesFragment query.
 */

import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linksFragment,
  logoFragment,
  metaFragment,
  portableTextFragment,
  titleFragment,
} from "./fragments";
import { FN_LOGO, GROQ_FUNCTIONS } from "./functions";
import { CARD_EXAMPLE_QUERY } from "./modules/card/card-example";
import { DRIVER_TEXT_QUERY } from "./modules/driver/driver-text";
import { HERO_PRIMARY_QUERY } from "./modules/hero/hero-primary";
import { MARQUEE_QUERY } from "./modules/marquee/marquee";
import { MEDIA_FILE_QUERY } from "./modules/media/media-file";
import { GLOBAL_MODULE_QUERY } from "./modules/miscellaneous/global-module";
import { SPACER_QUERY } from "./modules/miscellaneous/spacer";
import { RICH_TEXT_QUERY } from "./modules/text/rich-text";

/*
 * ====================================================
 * ============= MODULE-BUILDER FRAGMENT ==============
 * ====================================================
 */

// @sanity-typegen-ignore
export const modulesFragment = defineQuery(`
  modules[]{
    ${GLOBAL_MODULE_QUERY},
    ${SPACER_QUERY},
    ${HERO_PRIMARY_QUERY},
    ${MARQUEE_QUERY},
    ${RICH_TEXT_QUERY},
    ${DRIVER_TEXT_QUERY},
    ${MEDIA_FILE_QUERY},
    // Remove example modules
    ${CARD_EXAMPLE_QUERY},
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
      ${logoFragment},
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

export const PAGES_SLUGS_QUERY = defineQuery(`
  *[_type == $pageType && defined(slug)]{slug}
`);

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

export const GET_CONTENT_TYPE_INDEX_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == $contentType][0]{
    _type,
    slug,
    ${titleFragment},
    ${descriptionFragment},
    ${metaFragment},
    ${modulesFragment},
    "filters": {
      "defaults": {
        "label": "All", // Also used for as nuqs' default value for filtering
        "count": count(*[_type == ${selectContentType}]), // Total number of posts
      },
      "categories": {
        "label": select(
          $contentType == "blog-index" => "Field of Study",
          $contentType == "case-studies-index" => "Research Area",
          "Category" // Default fallback if specific content types don't have special labels
        ),
        "items": *[_type ==  select(
          $contentType == "blog-index" => "blog-category") && count(*[_type == ${selectContentType} && references(^._id)]) > 0] {
            _id,
            slug,
            ${titleFragment},
            "count": count(*[_type == ${selectContentType} && references(^._id)])
         }
       },
       "topics": {
        "label": select(
          $contentType == "case-studies-index" => "Industry",
          "Topic" // Default fallback if specific content types don't have special labels
        ),
        "items": *[_type == "content-topic" &&
        count(*[_type == ${selectContentType} && references(^._id)]) > 0] {
          _id,
          slug,
          ${titleFragment},
          "count": count(*[_type == ${selectContentType} && references(^._id)])
        },
       },
    },
    "pagination": {
      "totalPages": (count(*[_type == ${selectContentType} && ($topic == null || $topic in contentTopic[]->slug.current) && ($category == null || $category in category[]->slug.current)]) / $limit),
      "scrollTargetId": select(
        _type == "case-studies-index" => "case-studies-posts-list",
        _type == "blog-index" => "blog-posts-list",
        "posts-list"
      ),
    },
    "posts": *[_type == ${selectContentType} && ($topic == null || $topic in contentTopic[]->slug.current) && ($category == null || $category in category[]->slug.current)] | order(publishedDate desc, _createdAt desc) [$offset..$end] {
      _id,
      _type,
      _createdAt,
      publishedDate,
      slug,
      ${linksFragment},
      ${titleFragment},
      ${imageFragment},
      ${descriptionFragment},
      "href": select(
        _type == "case-study" => "/case-studies/" + slug.current,
        _type == "blog-post" => "/blog/" + slug.current,
      ),
      category[]->{
        _id,
        ${titleFragment},
      },
      contentTopic[]->{
        _id,
        ${titleFragment},
      },
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

export const GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY = defineQuery(`
  *[_type == $contentType && defined(slug)]{slug}
`);
