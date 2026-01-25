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
