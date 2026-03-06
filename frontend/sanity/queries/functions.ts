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
    type == "external" => href,
    @.internalLink->slug.current == "index" => "/",
    @.internalLink->_type == "blog-index" => "/blog",
    @.internalLink->_type == "blog-post" => "/blog/" + @.internalLink->slug.current,
    @.internalLink->_type == "case-studies-index" => "/case-studies",
    @.internalLink->_type == "case-study" => "/case-studies/" + @.internalLink->slug.current,
    @.internalLink->_type == "platform-index" => "/platform",
    @.internalLink->_type == "platform-child" => "/platform/" + @.internalLink->slug.current,
    "/" + @.internalLink->slug.current
  )
`;

export const FN_IMAGE = `
  fn fn::img($image) = $image {
    ${imageFields}
  };
`;

export const FN_IMAGES = `
  fn fn::imgs($images) = $images[] {
    ${imageFields}
  };
`;

export const FN_LOGO = `
  fn fn::logo($logo) = $logo {
    ${imageFields}
  };
`;

export const FN_LINK = `
  fn fn::link($link) = $link[] {
    ${linkFields}
  };
`;

export const FN_PT = `
  fn fn::pt($content) = $content[] {
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
      _type == "richTable" => {
      ...,
        _type,
        _key,
        hasColumnTitles,
        hasRowTitles,
        columnHeaders[]{
          _key,
          _type,
          cellIndex,
          title,
        },
        rows[]{
          _key,
          _type,
          cells[]{
            _key,
            _type,
            content[]{
              ...,
              markDefs[]{
                ...,
                _type == "link" => {
                  _type,
                  _key,
                  href,
                },
              },
            },
          },
        },
      },
  };
`;

export const FN_PT_PLAIN = `
  fn fn::ptPlain($content) = $content[] {
    ...,
    markDefs[]{
      ...,
      _type == "link" => {
        ${linkFields}
      }
    },
    _type == "link" => {
      ${linkFields}
    }
  };
`;

export const GROQ_FUNCTIONS = `
  ${FN_IMAGE}
  ${FN_IMAGES}
  ${FN_LOGO}
  ${FN_LINK}
  ${FN_PT_PLAIN}
  ${FN_PT}
`;
