import { groq } from "next-sanity";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listMultiAccordionQuery = groq`
  _type == "list-multi-accordion" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    accordions[]{
      _key,
      eyebrow,
      accordionItems[]{
        _key,
        title[]{
          ${portableTextPlainFragment}
        },
        description[]{
          ${portableTextPlainFragment}
        }
      }
    }
  }
`;
