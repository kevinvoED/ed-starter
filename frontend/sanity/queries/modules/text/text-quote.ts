import { groq } from "next-sanity";
import { imageFragment } from "../../shared/image";
import { linkFragment } from "../../shared/link";

// @sanity-typegen-ignore
export const textQuoteQuery = groq`
  _type == "text-quote" => {
    _type,
    _key,
    ${imageFragment},
    items[]{
      _key,
      eyebrow,
      quote,
      author{
        name,
        title
      }
    },
    ${linkFragment}
  }
`;
