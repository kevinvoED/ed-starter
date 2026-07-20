import { defineQuery } from "next-sanity";

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer"][0]{
    _key,
    _type,
  }
`);
