import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const imageTextTimelineQuery = groq`
  _type == "image-text-timeline" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linkFragment},
    cards[]{
      _key,
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
      ${imageFragment},
    }
  }
`;
