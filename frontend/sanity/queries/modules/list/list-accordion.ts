import { groq } from "next-sanity";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listAccordionQuery = groq`
  _type == "list-accordion" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    ${linkFragment},
    enableFaqSchema,
    items[]{
      _key,
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
    },
  }
`;
