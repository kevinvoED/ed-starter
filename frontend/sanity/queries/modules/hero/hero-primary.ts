import { defineQuery } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";

// @sanity-typegen-ignore
export const HERO_PRIMARY_QUERY = defineQuery(`
  _type == "hero-primary" => {
    _type,
    _key,
    title,
    ${linkFragment},
    ${imageFragment}
  }
`);
