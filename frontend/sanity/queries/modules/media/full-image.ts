import { defineQuery } from "next-sanity";
import { imageFragment } from "../../fragments";

// @sanity-typegen-ignore
export const FULL_IMAGE_QUERY = defineQuery(`
  _type == "full-image" => {
    _type,
    _key,
    ${imageFragment},
  }
`);
