/*
 * Sanity Data Fetching Layer
 *
 * Centralized file for fetching data from Sanity
 * Used for queries to fetch data such as navigation and all pages.
 *
 * All fetch functions use `sanityFetch` from @/sanity/lib/live which provides:
 * - Automatic caching and revalidation
 * - Visual editing support via Stega encoding
 * - Type-safe query results via Sanity TypeGen
 */

import type { ContentType } from "@/lib/utils/types";
import type {
  BANNER_QUERY_RESULT,
  FOOTER_QUERY_RESULT,
  GET_CONTENT_TYPE_INDEX_QUERY_RESULT,
  GET_CONTENT_TYPE_SLUG_QUERY_RESULT,
  GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY_RESULT,
  NAVBAR_QUERY_RESULT,
  ORGANIZATION_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { BANNER_QUERY } from "@/sanity/queries/documents/banner";
import { FOOTER_QUERY } from "@/sanity/queries/documents/footer";
import { NAVBAR_QUERY } from "@/sanity/queries/documents/navbar";
import {
  GET_CONTENT_TYPE_INDEX_QUERY,
  GET_CONTENT_TYPE_SLUG_QUERY,
  GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY,
  ORGANIZATION_QUERY,
  PAGE_SLUG_QUERY,
  PAGES_SLUGS_QUERY,
} from "@/sanity/queries/queries";

/*
 * ====================================================
 * ================== MODULE TYPES ====================
 * ====================================================
 */

type ModuleType = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>[number],
  { _type: unknown }
>["_type"];

export type ModuleProps<T extends ModuleType = ModuleType> = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>[number],
  { _type: T }
>;

/*
 * ====================================================
 * ================= GLOBAL QUERIES ===================
 * ====================================================
 */
export const fetchSanityOrganization =
  async (): Promise<ORGANIZATION_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: ORGANIZATION_QUERY,
    });
    return data;
  };

export const fetchSanityBanner = async (): Promise<BANNER_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: BANNER_QUERY,
  });
  return data;
};

export const fetchSanityNavbar = async (): Promise<NAVBAR_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: NAVBAR_QUERY,
  });
  return data;
};

export const fetchSanityFooter = async (): Promise<FOOTER_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: FOOTER_QUERY,
  });
  return data;
};

/*
 * ====================================================
 * ================== PAGE QUERIES ====================
 * ====================================================
 */
export const fetchPageSlugData = async ({
  pageType,
  slug,
}: {
  pageType: string;
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGE_SLUG_QUERY,
    params: { pageType, slug },
  });

  return data;
};

export const fetchPageStaticParamsData = async ({
  pageType,
}: {
  pageType: string;
}): Promise<PAGES_SLUGS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    params: { pageType },
    perspective: "published",
    stega: false,
  });

  return data;
};

/*
 * ====================================================
 * =============== CONTENT-TYPE QUERIES ===============
 * ====================================================
 */

export const fetchContentTypeIndexPageData = async ({
  contentType,
  category,
  page,
  limit = 2,
  topic,
}: {
  contentType: ContentType;
  category?: string;
  page?: number;
  limit?: number;
  topic?: string;
}): Promise<GET_CONTENT_TYPE_INDEX_QUERY_RESULT> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit - 1;

  const { data } = await sanityFetch({
    query: GET_CONTENT_TYPE_INDEX_QUERY,
    params: {
      contentType,
      category: category ?? null,
      topic: topic ?? null,
      page,
      offset,
      end,
    },
  });

  return data;
};

export const fetchContentTypeSlugPageData = async ({
  contentType,
  slug,
}: {
  contentType: ContentType;
  slug: string;
}): Promise<GET_CONTENT_TYPE_SLUG_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: GET_CONTENT_TYPE_SLUG_QUERY,
    params: { contentType, slug },
  });

  return data;
};

export const fetchContentTypeSlugStaticParamsData = async ({
  contentType,
}: {
  contentType: ContentType;
}): Promise<GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY,
    perspective: "published",
    stega: false,
    params: { contentType },
  });

  return data;
};
