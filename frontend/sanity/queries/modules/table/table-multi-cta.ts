import { groq } from "next-sanity";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const tableMultiCtaQuery = groq`
  _type == "table-multi-cta" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    tables[]{
      _key,
      title[]{
        ${portableTextPlainFragment}
      },
      items[]{
        _key,
        eyebrow,
        title[]{
          ${portableTextPlainFragment}
        },
        ${linkFragment},
      },
    },
  }
`;
