import { defineQuery } from "next-sanity";
import { imagesFragment, titleFragment } from "../../fragments";

// @sanity-typegen-ignore
export const MARQUEE_QUERY = defineQuery(`
  _type == "marquee" => {
    _type,
    _key,
    variant,
    enableVelocity,
    imageType,
    "items" : select(variant == "text" => items[]{
      _key,
      ${titleFragment},
    }),
    ${imagesFragment}
  }
`);
