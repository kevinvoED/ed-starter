import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const marqueeQuery = groq`
  _type == "marquee" => {
    _type,
    _key,
    variant,
    padding,
    separator,
    marquee[]{
      title,
    }
  }
`;
