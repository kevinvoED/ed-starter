import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listGridLogoQuery = groq`
  _type == "list-grid-logo" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    logos[]{
      _key,
      ${logoFragment},
    },
  }
`;
