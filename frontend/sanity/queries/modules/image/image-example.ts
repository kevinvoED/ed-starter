import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linksFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const IMAGE_EXAMPLE_QUERY = defineQuery(`
  _type == "image-example" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linksFragment},
    ${imageFragment},
  }
`);
