import { defineQuery } from "next-sanity";
import {
  descriptionFragment,
  linksFragment,
  logoFragment,
  titleFragment,
} from "../fragments";
import { GROQ_FUNCTIONS } from "../functions";

export const NAVBAR_QUERY = defineQuery(`
  ${GROQ_FUNCTIONS}

  *[_type == "navbar"][0]{
    _key,
    _type,
    ${logoFragment},
    mainLinks[]{
      _type,
      _key,
      _type == "standaloneLink" => {
        ${linksFragment}
      },
      _type == "group" => {
        ${titleFragment},
        group[]{
          _type,
          _key,
          _type == "card" => {
            _key,
            ${titleFragment},
            ${descriptionFragment},
            ${linksFragment}
          },
          _type == "link-group" => {
            _key,
            ${titleFragment},
            ${linksFragment}
          },
        }
      },
      _type == "divider" => {
        type,
      }
    },
  }
`);
