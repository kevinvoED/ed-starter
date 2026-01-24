export const imageFragment = `
  image{
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

export const imagesFragment = `
  images[]{
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

export const logoFragment = `
  logo{
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
