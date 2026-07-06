/*
 * Sanity Data Fetching Layer
 *
 * Centralized file for fetching data from Sanity.
 * All render-context helpers accept DynamicFetchOptions (perspective + stega)
 * and must be called from within a 'use cache' component boundary.
 * Static-params helpers use sanityFetchStaticParams (has its own 'use cache').
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
import {
  type DynamicFetchOptions,
  sanityFetch,
  sanityFetchStaticParams,
} from "@/sanity/lib/live";
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

export const fetchSanityOrganization = async ({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<ORGANIZATION_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: ORGANIZATION_QUERY,
    perspective,
    stega,
  });
  return data;
};

export const fetchSanityBanner = async ({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<BANNER_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: BANNER_QUERY,
    perspective,
    stega,
  });
  return data;
};

export const fetchSanityNavbar = async ({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<NAVBAR_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: NAVBAR_QUERY,
    perspective,
    stega,
  });
  return data;
};

export const fetchSanityFooter = async ({
  perspective,
  stega,
}: DynamicFetchOptions): Promise<FOOTER_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: FOOTER_QUERY,
    perspective,
    stega,
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
  perspective,
  stega,
}: {
  pageType: string;
  slug: string;
} & DynamicFetchOptions): Promise<PAGE_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: PAGE_SLUG_QUERY,
    params: { pageType, slug },
    perspective,
    stega,
  });

  return data;
};

export const fetchPageStaticParamsData = async ({
  pageType,
}: {
  pageType: string;
}): Promise<PAGES_SLUGS_QUERY_RESULT> => {
  const { data } = await sanityFetchStaticParams({
    query: PAGES_SLUGS_QUERY,
    params: { pageType },
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
  limit = 3,
  topic,
  perspective,
  stega,
}: {
  contentType: ContentType;
  category?: string;
  page?: number;
  limit?: number;
  topic?: string;
} & DynamicFetchOptions): Promise<GET_CONTENT_TYPE_INDEX_QUERY_RESULT> => {
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
      limit,
    },
    perspective,
    stega,
  });

  return data;
};

export const fetchContentTypeSlugPageData = async ({
  contentType,
  slug,
  perspective,
  stega,
}: {
  contentType: ContentType;
  slug: string;
} & DynamicFetchOptions): Promise<GET_CONTENT_TYPE_SLUG_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: GET_CONTENT_TYPE_SLUG_QUERY,
    params: { contentType, slug },
    perspective,
    stega,
  });

  return data;
};

export const fetchContentTypeSlugStaticParamsData = async ({
  contentType,
}: {
  contentType: ContentType;
}): Promise<GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY_RESULT> => {
  const { data } = await sanityFetchStaticParams({
    query: GET_CONTENT_TYPE_SLUGS_STATIC_PARAMS_QUERY,
    params: { contentType },
  });

  return data;
};
