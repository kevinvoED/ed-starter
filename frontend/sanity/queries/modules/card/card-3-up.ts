import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const card3UpQuery = groq`
  _type == "card-3-up" => {
    _type,
    _key,
    variant,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linkFragment},
    cards[]{
      _key,
      title,
      description[]{
        ${portableTextPlainFragment}
      },
      ${logoFragment},
      ${linkFragment},
    }
  }
`;
