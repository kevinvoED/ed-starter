import { defineQuery } from "next-sanity";

// @sanity-typegen-ignore
export const ANCHOR_QUERY = defineQuery(`
  _type == "anchor" => {
    _type,
    _key,
    anchorText
  }
`);
