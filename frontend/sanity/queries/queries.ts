/*
 * All imports involving GROQ queries must use relative imports.
 * Absolute imports are currently not supported by Sanity TypeGen and will cause typegen errors.
 */

import { defineQuery } from "next-sanity";
import {
  imageFragment,
  metaFragment,
  postFragment,
  ptFragment,
  ptPlainFragment,
} from "./fragments";
import { HERO_PRIMARY_QUERY } from "./modules/hero/hero-primary";
import { FN_COMMON_PARTIALS, FN_LOGO_PARTIAL } from "./partials";

/*
 * This `modulesFragment` is used to query for all modules.
 * This should contain all modules that should be used in the ModuleBuilder.
 * If you have created a new module schema, create a new query fragment for it and add it to the list.
 * Be mindful of duplicate commas between your new fragment and this modulesFragment.
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
  ${FN_LOGO_PARTIAL}

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
  ${FN_COMMON_PARTIALS}

  *[_type == "page" && slug.current == $slug][0]{
    ${modulesFragment},
    ${metaFragment}
  }
`);

// @sanity-typegen-ignore
export const PAGE_SLUG_QUERY = defineQuery(`
  ${FN_COMMON_PARTIALS}

  *[_type == $pageType && slug.current == $slug][0]{
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
  ${FN_COMMON_PARTIALS}

  *[_type == "post-index"][0]{
    slug,
    ${metaFragment},
    ${modulesFragment},
    title[]{
      ${ptPlainFragment}
    },
    description[]{
      ${ptPlainFragment}
    },
    featuredPost->{
      ${postFragment}
    },
    "posts": *[_type == "post" && ($topic == null || $topic in topics[]->slug.current)]| order(publishedDate desc, _createdAt desc) [$offset..$end] {
      ${postFragment}
    }
  }
`);

export const BLOG_SLUG_QUERY = defineQuery(`
  ${FN_COMMON_PARTIALS}

  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    _type,
    slug,
    publishedDate,
    ${imageFragment},
    ${metaFragment},
    ${modulesFragment},
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
    title[]{
      ${ptPlainFragment}
    },
    description[]{
      ${ptPlainFragment}
    },
    content[]{
      ${ptFragment},
    },
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug)]{slug}`,
);
