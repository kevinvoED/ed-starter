import { groq } from "next-sanity";

// @sanity-typegen-ignore
export const patternQuery = groq`
  _type == "pattern" => {
    _type,
    _key,
    variant,
  }
`;
