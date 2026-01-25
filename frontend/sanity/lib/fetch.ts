import type {
  BLOG_QUERY_RESULT,
  BLOG_SLUG_QUERY_RESULT,
  BLOG_SLUGS_QUERY_RESULT,
  FOOTER_QUERY_RESULT,
  NAVBAR_QUERY_RESULT,
  ORGANIZATION_QUERY_RESULT,
  PAGE_QUERY_RESULT,
  PAGES_SLUGS_QUERY_RESULT,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/queries/documents/footer";
import { NAVBAR_QUERY } from "@/sanity/queries/documents/navbar";
import {
  BLOG_QUERY,
  BLOG_SLUG_QUERY,
  BLOG_SLUGS_QUERY,
  ORGANIZATION_QUERY,
  PAGE_TYPE_QUERY,
  PAGES_SLUGS_QUERY,
} from "@/sanity/queries/queries";

// Types
type BlockType = NonNullable<
  NonNullable<PAGE_QUERY_RESULT>["blocks"]
>[number]["_type"];

export type BlockProps<T extends BlockType = BlockType> = Extract<
  NonNullable<NonNullable<PAGE_QUERY_RESULT>["blocks"]>[number],
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
  const { data } = await sanityFetch({
    query: PAGE_TYPE_QUERY,
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

// Blogs
export const fetchSanityBlogIndexPage = async ({
  category,
  page,
  limit,
  topic,
}: {
  category?: string;
  page?: number;
  limit: number;
  topic?: string;
}): Promise<BLOG_QUERY_RESULT> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit - 1;

  const { data } = await sanityFetch({
    query: BLOG_QUERY,
    params: {
      category: category ?? null,
      topic: topic ?? null,
      page,
      offset,
      end,
    },
  });
  return data;
};

export const fetchSanityBlogSlugPage = async ({
  slug,
}: {
  slug: string;
}): Promise<BLOG_SLUG_QUERY_RESULT> => {
  const { data } = await sanityFetch({
    query: BLOG_SLUG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityBlogSlugsStaticParams =
  async (): Promise<BLOG_SLUGS_QUERY_RESULT> => {
    const { data } = await sanityFetch({
      query: BLOG_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };
