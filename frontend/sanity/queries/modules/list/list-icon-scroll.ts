import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listIconScrollQuery = groq`
  _type == "list-icon-scroll" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    items[]{
      _key,
      ${logoFragment},
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      }
    },
  }
`;
