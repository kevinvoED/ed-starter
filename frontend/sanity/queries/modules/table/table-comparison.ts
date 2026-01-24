import { groq } from "next-sanity";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const tableComparisonQuery = groq`
  _type == "table-comparison" => {
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
      category,
      cells[],
      content[]{
        ${portableTextPlainFragment}
      },
    },
  }
`;
