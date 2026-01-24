/** Used on the sitemap to generate full urls to the content */
export const urlQuery = `
  "url": select(
    slug.current == "index" => $baseUrl + "/",
    _type == "post" => $baseUrl + "/blog/" + slug.current,
    _type == "post-index" => $baseUrl + "/blog",
    _type == "case-study" => $baseUrl + "/case-studies/" + slug.current,
    _type == "case-study-index" => $baseUrl + "/case-studies",
    _type == "resource" => $baseUrl + "/resources/" + slug.current,
    _type == "resource-index" => $baseUrl + "/resources",
    _type == "platform-index" => $baseUrl + "/platform",
    _type == "platform-child" => $baseUrl + "/platform/" + slug.current,
    _type == "solutions-child" => $baseUrl + "/solutions/" + slug.current,
    _type == "event" => $baseUrl + "/events/" + slug.current,
    _type == "events-index" => $baseUrl + "/events",
    $baseUrl + "/" + slug.current
  )
`;

export const hrefQuery = `
  "href": select(
    isExternal => href,
    @.internalLink->slug.current == "index" => "/",
    @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
    @.internalLink->_type == "post-index" => "/blog",
    @.internalLink->_type == "case-study" => "/case-studies/" + @.internalLink->slug.current,
    @.internalLink->_type == "case-study-index" => "/case-studies",
    @.internalLink->_type == "resource" => "/resources/" + @.internalLink->slug.current,
    @.internalLink->_type == "resource-index" => "/resources",
    @.internalLink->_type == "platform-index" => "/platform",
    @.internalLink->_type == "platform-child" => "/platform/" + @.internalLink->slug.current,
    @.internalLink->_type == "solutions-child" => "/solutions/" + @.internalLink->slug.current,
    @.internalLink->_type == "event" => "/events/" + @.internalLink->slug.current,
    @.internalLink->_type == "events-index" => "/events",
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

export const linksFragment = `
  links[]{
    ${linkFields}
  }
`;
