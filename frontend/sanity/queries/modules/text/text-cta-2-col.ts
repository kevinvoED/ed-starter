import { groq } from "next-sanity";
import { linksFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const textCta2ColQuery = groq`
  _type == "text-cta-2-col" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
    columns{
      columnOne[]{
        ${portableTextPlainFragment}
      },
      columnTwo[]{
        ${portableTextPlainFragment}
      }
    }
  }
`;
