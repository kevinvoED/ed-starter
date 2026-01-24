import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const textLogoQuery = groq`
  _type == "text-logo" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    marqueeImages[]{
      _key,
      ${imageFragment},
    },
  }
`;
