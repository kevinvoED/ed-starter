import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  linksFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const DRIVER_TEXT_QUERY = defineQuery(`
  _type == "driver-text" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linksFragment},
  }
`);
