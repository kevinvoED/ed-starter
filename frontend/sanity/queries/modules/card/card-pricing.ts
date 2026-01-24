import { groq } from "next-sanity";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const cardPricingQuery = groq`
  _type == "card-pricing" => {
    _type,
    _key,
    eyebrow,
    title[]{
        ${portableTextPlainFragment}
      },
    description[]{
      ${portableTextPlainFragment}
    },
    cards[]{
      _key,
      eyebrow,
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
      price,
      content[]{
        ${portableTextPlainFragment}
      },
      ${linkFragment},
    }
  }
`;
