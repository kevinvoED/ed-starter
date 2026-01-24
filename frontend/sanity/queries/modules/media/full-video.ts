import { groq } from "next-sanity";
import { videoFragment } from "../../shared/video";

// @sanity-typegen-ignore
export const fullVideoQuery = groq`
  _type == "full-video" => {
    _type,
    _key,
    ${videoFragment}
  }
`;
