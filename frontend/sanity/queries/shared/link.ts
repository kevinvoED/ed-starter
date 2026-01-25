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
