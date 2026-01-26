import { defineQuery } from "next-sanity";
import {
  imageFragment,
  linkFragment,
  portableTextFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const HERO_PRIMARY_QUERY = defineQuery(`
  _type == "hero-primary" => {
    _type,
    _key,
    title,
    ${linkFragment},
    ${imageFragment},
    content[]{
      ${portableTextFragment}
    }
  }
`);
