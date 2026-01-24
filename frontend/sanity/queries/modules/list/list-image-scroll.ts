import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkArrayFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const listImageScrollQuery = groq`
  _type == "list-image-scroll" => {
    _type,
    _key,
    eyebrow,
    tabs[]{
      _key,
      title,
      items[]{
        _key,
        title,
        description[]{
          ${portableTextPlainFragment}
        },
        "link": ${linkArrayFragment},
        ${imageFragment},
      }
    },
  }
`;
