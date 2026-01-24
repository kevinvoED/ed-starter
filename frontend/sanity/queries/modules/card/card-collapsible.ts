import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const cardCollapsibleQuery = groq`
  _type == "card-collapsible" => {
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
      content[]{
        _key,
        eyebrow,
        description[]{
          ${portableTextPlainFragment}
        },
      },
      ${imageFragment},
      ${linkFragment},
    }
  }
`;
