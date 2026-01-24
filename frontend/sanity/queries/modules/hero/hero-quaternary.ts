import { groq } from "next-sanity";
import { linksFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const heroQuaternaryQuery = groq`
  _type == "hero-quaternary" => {
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
    codeSnippet,
  }
`;
