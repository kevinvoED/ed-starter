import { defineQuery } from "next-sanity";
import { imagesFragment, titleFragment } from "../../fragments/fragments";

// @sanity-typegen-ignore
export const MARQUEE_QUERY = defineQuery(`
  _type == "marquee" => {
    _type,
    _key,
    variant,
    "items" : select(variant == "text" => items[]{
      _key,
      ${titleFragment},
    }),
    ${imagesFragment}
  }
`);
