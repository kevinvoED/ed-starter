import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  imageFragment,
  linksFragment,
  titleFragment,
} from "../../fragments";

// @sanity-typegen-ignore
export const CARD_EXAMPLE_QUERY = defineQuery(`
  _type == "card-example" => {
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linksFragment},
    cards[]{
      _key,
      ${titleFragment},
      ${descriptionFragment},
      ${linksFragment},
      ${imageFragment},
    }
  }
`);
