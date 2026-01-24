import { groq } from "next-sanity";
import { logoFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listMetricQuery = groq`
  _type == "list-metric" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${logoFragment},
    metrics[]{
      _key,
      eyebrow,
      title,
      description[]{
        ${portableTextPlainFragment}
      },
      ${linkFragment}
    },
  }
`;
