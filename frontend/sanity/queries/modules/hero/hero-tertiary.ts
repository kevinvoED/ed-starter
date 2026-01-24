import { groq } from "next-sanity";
import { portableTextContentHighlightQuery } from "../../modules/text/portable-text-content-highlight";
import { text2ColQuery } from "../../modules/text/text-2-col";
import { linksFragment } from "../../shared/link";
import { portableTextPlainFragment } from "../../shared/portable-text-plain";

// Reusable blocks query fragment - used by all page types
// @sanity-typegen-ignore
const contentBlocksQuery = groq`
  ${text2ColQuery},
  ${portableTextContentHighlightQuery},
`;

// @sanity-typegen-ignore
export const heroTertiaryQuery = groq`
  _type == "hero-tertiary" => {
    _type,
    _key,
    lottieAnimation,
    eyebrow,
    title[]{
      ${portableTextPlainFragment}
    },
    description[]{
      ${portableTextPlainFragment}
    },
    ${linksFragment},
    contentTitle[]{
      ${portableTextPlainFragment}
    },
    contentBlocks[]{
      ${contentBlocksQuery}
    },
  }
`;
