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

// Types
type ModuleType = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["modules"]
>[number]["_type"];

export type ModuleProps<T extends ModuleType = ModuleType> = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["modules"]>[number],
  { _type: T }
>;

// Global Items
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

// Pages
export const fetchSanityPageBySlug = async ({
  pageType,
  slug,
}: {
  pageType: string;
  slug: string;
}): Promise<PAGE_QUERY_RESULT> => {
  // console.log(
  //   "Query size:",
  //   new TextEncoder().encode(PAGE_SLUG_QUERY).length,
  //   "bytes",
  // );
  const { data } = await sanityFetch({
    query: PAGE_SLUG_QUERY,
    params: { pageType, slug },
  });

  return data;
};

export const fetchSanityPagesStaticParams = async ({
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

// Authors
// export const fetchSanityAuthorBySlug = async ({
//   slug,
// }: {
//   slug: string;
// }): Promise<AUTHOR_QUERY_RESULT> => {
//   const { data } = await sanityFetch({
//     query: AUTHOR_QUERY,
//     params: { slug, offset: 0, end: 0 },
//   });
//   return data;
// };

// export const fetchSanityAuthorWithResources = async ({
//   slug,
//   page,
//   limit,
// }: {
//   slug: string;
//   page?: number;
//   limit: number;
// }): Promise<AUTHOR_QUERY_RESULT> => {
//   const offset = page && limit ? (page - 1) * limit : 0;
//   const end = offset + limit;

//   const { data } = await sanityFetch({
//     query: AUTHOR_QUERY,
//     params: { slug, offset, end },
//   });
//   return data;
// };

// export const fetchSanityAuthorsStaticParams =
//   async (): Promise<AUTHOR_SLUGS_QUERY_RESULT> => {
//     const { data } = await sanityFetch({
//       query: AUTHOR_SLUGS_QUERY,
//       perspective: "published",
//       stega: false,
//     });
//     return data;
//   };

/*
 * ====================================================
 * =============== CONTENT-TYPE QUERIES ===============
 * ====================================================
 */

type ContentType = "blog-index" | "case-studies-index";

export const FETCH_CONTENT_TYPE_INDEX_PAGE_DATA = async ({
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

export const FETCH_CONTENT_TYPE_SLUG_PAGE_DATA = async ({
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

export const FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA = async ({
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
