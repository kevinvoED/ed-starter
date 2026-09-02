import { defineQuery } from "next-sanity";
import { descriptionFragment } from "../fragments";
import { GROQ_FUNCTIONS } from "../functions";

export const BANNER_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "banner"]{
    _type,
    _key,
    banners[]{
      _type,
      _key,
      state,
      ${descriptionFragment},
    },
  }
`);
