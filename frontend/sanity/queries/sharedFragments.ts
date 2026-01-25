/** Used on the sitemap to generate full urls to the content */
export const urlQuery = `
  "url": select(
    slug.current == "index" => $baseUrl + "/",
    _type == "post" => $baseUrl + "/blog/" + slug.current,
    _type == "post-index" => $baseUrl + "/blog",
    _type == "platform-index" => $baseUrl + "/platform",
    _type == "platform-child" => $baseUrl + "/platform/" + slug.current,
    $baseUrl + "/" + slug.current
  )
`;

export const hrefQuery = `
  "href": select(
    isExternal => href,
    @.internalLink->slug.current == "index" => "/",
    @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
    @.internalLink->_type == "post-index" => "/blog",
    @.internalLink->_type == "platform-index" => "/platform",
    @.internalLink->_type == "platform-child" => "/platform/" + @.internalLink->slug.current,
    "/" + @.internalLink->slug.current
  )
`;

export const linkFields = `
  _type,
  _key,
  ...,
  ${hrefQuery}
`;

export const linkArrayFragment = `
  link[0]{
    ${linkFields}
  }
`;

export const linkFragment = `
  link[]{
    ${linkFields}
  }
`;

const imageFields = `
  ...,
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  }
`;

export const imageFragment = `
  image{
    ${imageFields}
  }
`;

export const imagesFragment = `
  images[]{
    ${imageFields}
  }
`;

export const logoFragment = `
  logo{
    ${imageFields}
  }
`;

export const videoFragment = `
  video{
    ...,
    asset->{
      _id,
      url,
      mimeType,
      metadata {
        lqip,
        dimensions {
          width,
          height
        }
      }
    }
  }
`;

export const metaFragment = `
    meta{
    // use the title assigned in meta or the parent document title
    "title": coalesce(title, select(^.title[0]._type == "module" => pt::text(^.title), ^.title)),
    description,
    noindex,
    "relativeUrl": select(
      ^.slug.current == "index" => "/",
      ^._type == "post" => "/blog/" + ^.slug.current,
      ^._type == "post-index" => "/blog",
      ^._type == "platform-index" => "/platform",
      ^._type == "platform-child" => "/platform/" + ^.slug.current,
      "/" + ^.slug.current
    ),
    // the dimensions are the recommended meta image size
    "image": coalesce(
      // use the image directly assigned in meta
      image.asset->url + "?w=1200&h=630&fit=max",
      // use the image directly on this document
      ^.image.asset->url + "?w=1200&h=630&fit=max",
      // find and use the first hero image
      select(^.modules[0]._type match "hero*" => ^.modules[0].image.asset->url + "?w=1200&h=630&fit=max", null),
      // find and use the organization image
      *[_type == "organization"][0].organization.image.asset->url + "?w=1200&h=630&fit=max"
    )
  }
`;

export const portableTextPlainFragment = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ${linkFields}
    }
  },
  _type == "link" => {
    ${linkFields}
  },
`;

export const portableTextFragment = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ${linkFields}
    }
  },
  _type == "image" => {
    ${imageFragment}
  },
  _type == "link" => {
    ${linkFields}
  },
  _type == "promo-card" => {
    title,
    description,
    ${imageFragment},
    "link": ${linkArrayFragment}
  },
  _type == "listDriver" => {
    title,
    items[]{
      _key,
      eyebrow,
      "link": ${linkArrayFragment}
    }
  },
  _type == "quote" => {
    title[]{
      ${portableTextPlainFragment}
    },
    author,
  },
  _type == "portable-text-accordion" => {
    ...,
    faqs[]{
      _key,
      title,
      content[]{
        ...,
          markDefs[]{
            ...,
            _type == "link" => {
              ${linkFields}
            }
          },
        ${imageFragment},
      },
    },
    ${imageFragment},
  }
`;
