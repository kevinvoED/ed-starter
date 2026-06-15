import { defineQuery } from "next-sanity";
import { imageFragment, videoFragment } from "../../fragments";

// @sanity-typegen-ignore
export const MEDIA_FILE_QUERY = defineQuery(`
  _type == "media-file" => {
    _type,
    _key,
    variant,
    ${imageFragment},
    ${videoFragment},
  }
`);
