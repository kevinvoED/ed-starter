import { groq } from "next-sanity";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const portableTextContentHighlightQuery = groq`
  _type == "portable-text-content-highlight" => {
    _type,
    _key,
    content[]{
      ${portableTextPlainFragment}
    }
  }
`;
