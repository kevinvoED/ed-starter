import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const text2ColQuery = groq`
  _type == "text-2-col" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    ${logoFragment},
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
