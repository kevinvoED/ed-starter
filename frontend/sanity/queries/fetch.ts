/*
 * This file contains all fetch queries after you've created a new query in /frontend/sanity/queries/index.ts
 * If you've successfuly generated types for your query, you can import that type here and use it
 *
 * Please keep this file organized and well documented
 * You can also pass additional options to the sanityFetch function here, such as `params`, `perspective` and `stega`
 */

import { sanityFetch } from '@/sanity/lib/live';
import type { TestQueryResult } from '@/sanity.types';

// export const fetchTestQuery =
//   async (): Promise<TestQueryResult> => {
//     const { data } = await sanityFetch({
//       query: testQuery,
//     });
//     return data;
//   };
