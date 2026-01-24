import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkArrayFragment, linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const cardGridMarqueeQuery = groq`
  _type == "card-grid-marquee" => {
    _type,
    _key,
    marquee[]{
      title,
    },
    title[]{
      ${portableTextPlainFragment}
    },
    ${linkFragment},
    cards[]{
      _key,
      ${imageFragment},
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
      "link": ${linkArrayFragment}
    }
  }
`;
