import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const TABLE_EXAMPLE_QUERY = defineQuery(`
  _type == "table-example" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
    ${imageFragment},
  }
`);
