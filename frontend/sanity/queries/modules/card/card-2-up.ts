import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const card2UpQuery = groq`
  _type == "card-2-up" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
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
