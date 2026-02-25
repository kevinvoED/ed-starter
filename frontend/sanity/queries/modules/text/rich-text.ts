import { defineQuery } from "next-sanity";
import { portableTextFragment } from "../../fragments";

// @sanity-typegen-ignore
export const RICH_TEXT_QUERY = defineQuery(`
  _type == "rich-text" => {
    _type,
    _key,
    ${portableTextFragment},
  }
`);
