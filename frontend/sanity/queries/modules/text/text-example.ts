import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linkFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const TEXT_EXAMPLE_QUERY = defineQuery(`
  _type == "text-example" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linkFragment},
    ${imageFragment},
  }
`);
