/*
 * All imports involving GROQ queries must use relative imports.
 * Absolute imports are currently not supported by Sanity TypeGen and will cause typegen errors.
 */

import { defineQuery } from "next-sanity";
import { HERO_PRIMARY_QUERY } from "./modules/hero/hero-primary";
import { imageFragment, logoFragment } from "./shared/image";
import { linkArrayFragment } from "./shared/link";
import { metaQuery } from "./shared/meta";
import { portableTextFragment } from "./shared/portable-text";
import { portableTextPlainFragment } from "./shared/portable-text-plain";

/*
 * This `modulesFragment` is used to query for all modules.
 * This should contain all modules that should be used in the ModuleBuilder.
 * If you have created a new module schema, create a new query fragment for it and add it to the list.
 * Be mindful of duplicate commas between your new fragment and this modulesFragment.
 */
// @sanity-typegen-ignore
export const modulesFragment = defineQuery(`
  ${HERO_PRIMARY_QUERY},
`);

/*
 * ====================================================
 * ================== MISC. QUERIES ===================
 * ====================================================
 */

export const ORGANIZATION_QUERY = defineQuery(`
  *[_type == "organization"][0]{
    organization {
      ...,
      ${logoFragment}
    }
  }
`);

/*
 * ====================================================
 * =================== PAGE QUERIES ===================
 * ====================================================
 */
export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _type,
    blocks[]{
      ${modulesFragment}
    },
    ${metaQuery}
  }
`);

// @sanity-typegen-ignore
export const PAGE_TYPE_QUERY = defineQuery(`
  *[_type == $pageType && slug.current == $slug][0]{
    _type,
    title,
    description,
    slug,
    blocks[]{
      ${modulesFragment}
    },
    ${metaQuery},
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
  *[_type == "post-index"][0]{
    _id,
    _type,
    title,
    description,
    slug,
    ${metaQuery},
    blocks[]{
      ${modulesFragment}
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
`);

export const BLOG_SLUG_QUERY = defineQuery(`
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
      ${modulesFragment}
    },
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180 ),
  }
`);

export const BLOG_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug)]{slug}`,
);
