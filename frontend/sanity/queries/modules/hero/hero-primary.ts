import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  portableTextFragment,
  titleFragment,
} from "../../fragments/fragments";

// @sanity-typegen-ignore
export const HERO_PRIMARY_QUERY = defineQuery(`
  _type == "hero-primary" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
    ${imageFragment},
    ${portableTextFragment},
  }
`);
