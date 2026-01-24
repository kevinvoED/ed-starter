import { groq } from "next-sanity";
import { linkArrayFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const driverListQuery = groq`
  _type == "driver-list" => {
    _type,
    _key,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    items[]{
      _key,
      eyebrow,
      "link": ${linkArrayFragment}
    }
  }
`;
