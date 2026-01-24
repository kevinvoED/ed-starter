import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const textDialQuery = groq`
  _type == "text-dial" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    ${logoFragment},
    items[]{
      _key,
     description[]{
      _key,
      ${portableTextPlainFragment}
     }
    }
  }
`;
