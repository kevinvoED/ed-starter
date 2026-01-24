import { groq } from "next-sanity";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const infographicModelQuery = groq`
  _type == "infographic-model" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    listsTitle[]{
      ${portableTextPlainFragment}
    },
    lists[] {
      _key,
      title[]{
        ${portableTextPlainFragment}
      },
      subtitle[]{
        ${portableTextPlainFragment}
      },
      items[] {
        _key,
        title[]{
          ${portableTextPlainFragment}
        },
      },
    },
  }
`;
