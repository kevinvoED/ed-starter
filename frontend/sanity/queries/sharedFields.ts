/* 
  * This file contains commonly used fragments or queries to be used in other queries
  * It helps avoid repeating fields and makes your queries more readable
  * If there is a field that is being used multiple times, consider creating a shared fragment for it here
  * Please keep this file organized and well documented
*/

import { groq } from "next-sanity"

export const imageQuery = `
  ...,
  asset->{
    _id,
    url,
    mimeType,
    metadata {
      lqip,
      dimensions {
        width,
        height
      }
    }
  }
`;
