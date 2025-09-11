/* 
  * This file contains all GROQ queries for fetching data from existing Sanity schemas
  * After creating a new query, run `npm run typegen` to generate the types for the query
  * This will generate types for your query inside /frontend/sanity.types.ts
  * Once your type has been generated, you can write a fetch query in /frontend/sanity/queries/fetch.ts 
  * Afterwards, you can use the fetch query in your components to fetch the data
  * 
  * Please keep this file organized and well documented
  * Remember to make good use of shared fragments in /frontend/sanity/queries/sharedFields.ts 
  * And consider creating your own shared fragments in `sharedFields.ts` if you find yourself repeating fields
*/

import { groq } from "next-sanity";

export const testQuery = groq`
  *[_type == "test"] {
    ...,
  }
`;