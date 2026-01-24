import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const imageTextTabQuery = groq`
  _type == "image-text-tab" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    menuTitle,
    cards[]{
      _key,
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
      ${imageFragment},
    }
  }
`;
