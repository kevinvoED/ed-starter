export const imageFields = `
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

export const linkFields = `
  ...,
  _key,
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

export const FN_IMAGE_PARTIAL = `
  fn fn::img($image) = $image {
    ${imageFields}
  };
`;

export const FN_IMAGES_PARTIAL = `
  fn fn::imgs($images) = $images[] {
    ${imageFields}
  };
`;

export const FN_LOGO_PARTIAL = `
  fn fn::logo($logo) = $logo {
    ${imageFields}
  };
`;

export const FN_LINK_PARTIAL = `
  fn fn::link($link) = $link[] {
    ...,
    _key,
    "href": select(
      isExternal => href,
      @.internalLink->slug.current == "index" => "/",
      @.internalLink->_type == "post" => "/blog/" + @.internalLink->slug.current,
      @.internalLink->_type == "post-index" => "/blog",
      @.internalLink->_type == "platform-index" => "/platform",
      @.internalLink->_type == "platform-child" => "/platform/" + @.internalLink->slug.current,
      "/" + @.internalLink->slug.current
    )
  };
`;

export const FN_COMMON_PARTIALS = `
  ${FN_IMAGE_PARTIAL}
  ${FN_IMAGES_PARTIAL}
  ${FN_LOGO_PARTIAL}
  ${FN_LINK_PARTIAL}
`;
