import { defineQuery } from "next-sanity";
import { imageFragment, linkFragment } from "../../fragments";

// @sanity-typegen-ignore
export const HERO_PRIMARY_QUERY = defineQuery(`
  _type == "hero-primary" => {
    _type,
    _key,
    "title": fn::ptPlain(title),
    ${linkFragment},
    ${imageFragment},
    "content": fn::pt(content),
  }
`);
