import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const CARD_EXAMPLE_QUERY = defineQuery(`
  _type == "card-example" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
    ${imageFragment},
  }
`);
