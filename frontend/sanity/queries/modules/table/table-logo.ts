import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const tableLogoQuery = groq`
  _type == "table-logo" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    columns[]{
      _key,
      label,
    },
    rows[]{
      _key,
      ${imageFragment},
      invert,
      cells[] {
        _key,
        content[] {
          ${portableTextPlainFragment}
        }
      }
    }
  }
`;
