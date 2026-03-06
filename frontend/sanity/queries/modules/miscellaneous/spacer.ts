import { defineQuery } from "next-sanity";

// @sanity-typegen-ignore
export const SPACER_QUERY = defineQuery(`
  _type == "spacer" => {
    _type,
    _key,
    spacing,
    anchorId
  }
`);
