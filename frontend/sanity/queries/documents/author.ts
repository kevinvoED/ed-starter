import { groq } from "next-sanity";
import { imageFragment } from "../shared/image";
import { portableTextPlainFragment } from "../shared/portable-text-plain";

export const authorFragment = groq`author->{
  _id,
  name,
  content[]{
    ${portableTextPlainFragment}
  },
  ${imageFragment}
}`;
export const AUTHOR_QUERY = groq`*[_type == "author" && slug.current == $slug][0]{
  name,
  ${imageFragment},
  content[]{
    ${portableTextPlainFragment}
  },
}`;

export const AUTHOR_SLUGS_QUERY = groq`*[_type == "author" && defined(slug)]{slug}`;
