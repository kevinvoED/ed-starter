/*
 * This file contains all fetch queries after you've created a new query in /frontend/sanity/queries/index.ts
 * If you've successfuly generated types for your query, you can import that type here and use it
 *
 * Please keep this file organized and well documented
 * You can also pass additional options to the sanityFetch function here, such as `params`, `perspective` and `stega`
 * It can be invoked on the frontend, primarily by pages, e.g. `const data = await getNavigation();`
 */

import type {
  GetPageQueryResult,
  HomepageQueryResult,
  NavigationQueryResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import {
  getPageQuery,
  homepageQuery,
  navigationQuery,
} from "@/sanity/queries/queries";

export const getNavigation = async (): Promise<NavigationQueryResult> => {
  const { data } = await sanityFetch({
    query: navigationQuery,
  });

  return data;
};

export const getPageBySlug = async (params: {
  slug: string;
}): Promise<GetPageQueryResult> => {
  const { data } = await sanityFetch({
    query: getPageQuery,
    params,
    stega: false,
  });

  return data;
};

export const getHomepage = async (): Promise<HomepageQueryResult> => {
  const { data } = await sanityFetch({
    query: homepageQuery,
  });

  return data;
};
