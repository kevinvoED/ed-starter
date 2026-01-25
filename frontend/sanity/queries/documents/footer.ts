import { defineQuery } from "next-sanity";

export const FOOTER_QUERY = defineQuery(`
  *[_type == "footer"]{
    _key,
    _type,
  }
`);
