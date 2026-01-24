import { groq } from "next-sanity";
import { linksFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const heroQuinaryQuery = groq`
  _type == "hero-quinary" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
  }
`;
