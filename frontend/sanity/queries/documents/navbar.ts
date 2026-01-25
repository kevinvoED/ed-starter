import { defineQuery } from "next-sanity";

export const NAVBAR_QUERY = defineQuery(`
  *[_type == "navbar"]{
    _type,
  }
`);
