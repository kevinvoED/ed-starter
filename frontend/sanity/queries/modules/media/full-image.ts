import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";

// @sanity-typegen-ignore
export const fullImageQuery = groq`
  _type == "full-image" => {
    _type,
    _key,
    ${imageFragment}
  }
`;
