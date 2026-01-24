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
