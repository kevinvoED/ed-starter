/*
 * All imports involving GROQ queries must use relative imports.
 * Absolute imports are currently not supported by Sanity TypeGen and will cause typegen errors.
 * Add your custom module schema query fragments to the modulesFragment query.
 */

import { defineQuery } from "next-sanity";
import {
  imageFragment,
  metaFragment,
  postFragment,
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
 * =================== BLOG QUERIES ===================
 * ====================================================
 */
export const BLOG_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "blog-index"][0]{
    _type,
    slug,
    ${metaFragment},
    ${modulesFragment},
    "title": fn::ptPlain(title),
    "description": fn::ptPlain(description),
    featuredPost->{
      ${postFragment}
    },
    "posts": *[_type == "blog-post" && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      ${postFragment}
    }
  }
`);

export const BLOG_SLUG_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "blog-post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    slug,
    publishedDate,
    ${imageFragment},
    ${metaFragment},
    ${modulesFragment},
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
    "title": fn::ptPlain(title),
    "description": fn::ptPlain(description),
    "content": fn::pt(content),
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug)]{slug}`,
);
