import { defineQuery } from "next-sanity";
import { videoFragment } from "../../fragments";

// @sanity-typegen-ignore
export const FULL_VIDEO_QUERY = defineQuery(`
  _type == "full-video" => {
    _type,
    _key,
   ${videoFragment}
  }
`);
