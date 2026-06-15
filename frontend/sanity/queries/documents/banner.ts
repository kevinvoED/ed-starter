import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  linksFragment,
  titleFragment,
} from "../fragments";
import { GROQ_FUNCTIONS } from "../functions";

export const BANNER_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "banner"]{
    _type,
    _key,
    ${titleFragment},
    ${descriptionFragment},
    ${linksFragment},
  }
`);
