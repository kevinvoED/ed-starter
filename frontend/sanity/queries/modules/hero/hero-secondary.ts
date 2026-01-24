import { groq } from "next-sanity";
import {
  imageFragment,
  imagesFragment,
  logoFragment,
} from "../../shared/image";
import { linksFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// @sanity-typegen-ignore
export const heroSecondaryQuery = groq`
  _type == "hero-secondary" => {
    _type,
    _key,
    type,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
    contentEyebrow,
    contentBlocks[] {
      _key,
      content[] {
        ${portableTextPlainFragment}
      }
    },
    codeSnippet,
    itemsLabel,
    items[]{
      _key,
      ${logoFragment},
      title[]{
        ${portableTextPlainFragment}
      },
      description[]{
        ${portableTextPlainFragment}
      },
      ${imagesFragment},
    },
    ${imageFragment},
  }
`;
