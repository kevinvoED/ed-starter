import { groq } from "next-sanity";
import { imageFragment, logoFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listCta3UpQuery = groq`
  _type == "list-cta-3-up" => {
    _type,
    _key,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    items[]{
      _key,
      title,
      subtitle,
      ${logoFragment},
      ${linkFragment}
    },
    marqueeImages[]{
      _key,
      ${imageFragment},
    },
  }
`;
