import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linksFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const HERO_PRIMARY_QUERY = defineQuery(`
  _type == "hero-primary" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linksFragment},
    ${imageFragment},
  }
`);
