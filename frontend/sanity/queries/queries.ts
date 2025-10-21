import { defineQuery } from "next-sanity";

/*
 * This file contains all GROQ queries for fetching data from existing Sanity schemas
 * After creating a new query, run `npm run typegen` to generate the types for the query
 * This will generate types for your query inside /frontend/sanity.types.ts
 * Once your type has been generated, you can write a fetch query in /frontend/sanity/queries/fetch.ts
 * Afterwards, you can use the fetch query in your components to fetch the data
 *
 * Please keep this file organized and well documented
 * Remember to make good use of shared fragments in /frontend/sanity/queries/sharedFields.ts
 * And consider creating your own shared fragments in `sharedFields.ts` if you find yourself repeating fields
 */

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const ctaFields = /* groq */ `
  _type == "cta" => {
    ...,
    "page": page->slug.current,
    "post": post->slug.current,
    type,
    label,
    href,
    openInNewTab
  }
`;

const ctasFields = /* groq */ `
  ctas[] {
    ...,
    ${ctaFields}
  }
`;

const internalLinkFields = /* groq */ `
  _type == "internalLink" => {
    "slug": @.reference->slug.current,
  }
`;

export const portableTextFields = /* groq */ `
  content[]{
    ...,
    markDefs[]{
      ...,
      ${internalLinkFields}
    },
    ${ctaFields},
  }
`;

export const portableTextPlainFields = /* groq */ `
  content[]{
    ...,
    markDefs[]{
      ...,
      ${internalLinkFields}
    }
  }
`;

export const heroPrimaryQuery = /* groq */ `
  _type == "heroPrimary" => {
    _key,
    title,
    description,
    image,
    ${ctasFields},
    ${portableTextFields},
  }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    description,
    "modules": modules[]{
      ...,
      ${heroPrimaryQuery}
    },
  }
`);

export const navigationQuery = defineQuery(`*[_type == 'navigation'][0]{
  _key,
  title,
  description,
  image,
  ${ctaFields},
}`);

export const settingsQuery = defineQuery(`*[_type == 'settings'][0]{
  title,
  description,
  socialMedia,
  ogImage,
}`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug.current
        },
        ${ctaFields}
      }
    },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
