import { groq } from "next-sanity";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listTextQuery = groq`
  _type == "list-text" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linkFragment},
    items[]{
      _key,
      eyebrow,
      title[]{
        ${portableTextPlainFragment}
      },
    },
  }
`;
