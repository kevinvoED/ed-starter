import { imageFields } from "../functions/functions";

// Used in sitemap.ts to generate full urls to the content
export const urlQuery = `
  "url": select(
    slug.current == "index" => $baseUrl + "/",
    _type == "blog-index" => $baseUrl + "/blog",
    _type == "blog-post" => $baseUrl + "/blog/" + slug.current,
    _type == "case-studies-index" => $baseUrl + "/case-studies",
    _type == "case-study" => $baseUrl + "/case-studies/" + slug.current,
    _type == "platform-index" => $baseUrl + "/platform",
    _type == "platform-child" => $baseUrl + "/platform/" + slug.current,
    $baseUrl + "/" + slug.current
  )
`;

/*
 * Uses the title assigned in meta or the parent document title
 * 1200x630 is the recommended meta image size
 * The image is the first hero image, the organization image, or the image assigned in meta
 * The relative url is the url of the page without the base url
 * The image is the image assigned in meta or the first hero image, the organization image, or the image assigned in meta
 */
export const metaFragment = `
    meta{
    "title": coalesce(title, select(^.title[0]._type == "module" => pt::text(^.title), ^.title)),
    description,
    noindex,
    "relativeUrl": select(
      ^.slug.current == "index" => "/",
      ^._type == "blog-index" => "/blog",
      ^._type == "blog-post" => "/blog/" + ^.slug.current,
      ^._type == "case-studies-index" => "/case-studies",
      ^._type == "case-study" => "/case-studies/" + ^.slug.current,
      ^._type == "platform-index" => "/platform",
      ^._type == "platform-child" => "/platform/" + ^.slug.current,
      "/" + ^.slug.current
    ),
    "image": coalesce(
      image.asset->url + "?w=1200&h=630&fit=max",
      ^.image.asset->url + "?w=1200&h=630&fit=max",
      select(^.modules[0]._type match "hero*" => ^.modules[0].image.asset->url + "?w=1200&h=630&fit=max", null),
      *[_type == "organization"][0].organization.image.asset->url + "?w=1200&h=630&fit=max"
    )
  }
`;

// Used for PortableTextPlain fields
export const ptPlainFragment = `
  fn::ptPlain(content)
`;

// Used for PortableText fields
export const ptFragment = `
  fn::ptPlain(content)
`;

export const linkFragment = `
  "link": fn::link(link)
`;

export const imageFragment = `
  "image": fn::img(image)
`;

export const videoFragment = `
  video{
   ${imageFields}
  }
`;

// ------------------
// Common Fragments
// ------------------
export const titleFragment = `
  "title": fn::ptPlain(title)
`;

export const descriptionFragment = `
  "description": fn::ptPlain(description)
`;

export const portableTextFragment = `
  "content": fn::pt(content)
`;
