import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const cardListQuery = groq`
  _type == "card-list" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    cards[]{
      _key,
      title,
      description[]{
        ${portableTextPlainFragment}
      },
      subtitle,
      ${imageFragment},
      ${linkFragment},
    }
  }
`;
