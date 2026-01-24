import { groq } from "next-sanity";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const tableDataFeedQuery = groq`
  _type == "table-data-feed" => {
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
      label,
      styling,
      cells[]{
        _key,
        cellType,
        content[]{
          ${portableTextPlainFragment}
        }
      },
    },
  }
`;
