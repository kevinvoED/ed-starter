import { imageFragment } from "./image";
import { linkArrayFragment, linkFields } from "./link";
import { portableTextPlainFragment } from "./portable-text-plain";

export const portableTextFragment = `
  ...,
  markDefs[]{
    ...,
    _type == "link" => {
      ${linkFields}
    }
  },
  _type == "image" => {
    ${imageFragment}
  },
  _type == "link" => {
    ${linkFields}
  },
  _type == "promo-card" => {
    title,
    description,
    ${imageFragment},
    "link": ${linkArrayFragment}
  },
  _type == "listDriver" => {
    title,
    items[]{
      _key,
      eyebrow,
      "link": ${linkArrayFragment}
    }
  },
  _type == "quote" => {
    title[]{
      ${portableTextPlainFragment}
    },
    author,
  },
  _type == "portable-text-accordion" => {
    ...,
    faqs[]{
      _key,
      title,
      content[]{
        ...,
          markDefs[]{
            ...,
            _type == "link" => {
              ${linkFields}
            }
          },
        ${imageFragment},
      },
    },
    ${imageFragment},
  }
`;
