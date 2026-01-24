import type {
  AUTHOR_QUERYResult,
  AUTHOR_SLUGS_QUERYResult,
  BLOG_QUERYResult,
  BLOG_SLUG_QUERYResult,
  BLOG_SLUGS_QUERYResult,
  CASE_STUDIES_QUERYResult,
  CASE_STUDIES_SLUG_QUERYResult,
  CASE_STUDIES_SLUGS_QUERYResult,
  EVENTS_QUERYResult,
  EVENTS_SLUG_QUERYResult,
  EVENTS_SLUGS_QUERYResult,
  FOOTER_QUERYResult,
  NAVBAR_QUERYResult,
  ORGANIZATION_QUERYResult,
  PAGE_QUERYResult,
  PAGES_SLUGS_QUERYResult,
  RESOURCE_CATEGORY_COUNT_QUERYResult,
  RESOURCE_QUERYResult,
  RESOURCE_SLUG_QUERYResult,
  RESOURCE_SLUGS_QUERYResult,
  RESOURCE_TOPICS_COUNT_QUERYResult,
} from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/queries/documents/footer";
import { NAVBAR_QUERY } from "@/sanity/queries/documents/navbar";
import {
  BLOG_QUERY,
  BLOG_SLUG_QUERY,
  BLOG_SLUGS_QUERY,
  CASE_STUDIES_QUERY,
  CASE_STUDIES_SLUG_QUERY,
  CASE_STUDIES_SLUGS_QUERY,
  EVENTS_QUERY,
  EVENTS_SLUG_QUERY,
  EVENTS_SLUGS_QUERY,
  ORGANIZATION_QUERY,
  PAGE_TYPE_QUERY,
  PAGES_SLUGS_QUERY,
  RESOURCE_CATEGORY_COUNT_QUERY,
  RESOURCE_QUERY,
  RESOURCE_SLUG_QUERY,
  RESOURCE_SLUGS_QUERY,
  RESOURCE_TOPICS_COUNT_QUERY,
} from "@/sanity/queries/page";
import { AUTHOR_QUERY, AUTHOR_SLUGS_QUERY } from "../queries/documents/author";

// Types
type BlockType = NonNullable<
  NonNullable<PAGE_QUERYResult>["blocks"]
>[number]["_type"];

export type BlockProps<T extends BlockType = BlockType> = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["blocks"]>[number],
  { _type: T }
>;

// Global Items
export const fetchSanityOrganization =
  async (): Promise<ORGANIZATION_QUERYResult> => {
    const { data } = await sanityFetch({
      query: ORGANIZATION_QUERY,
    });
    return data;
  };

export const fetchSanityNavbar = async (): Promise<NAVBAR_QUERYResult> => {
  const { data } = await sanityFetch({
    query: NAVBAR_QUERY,
  });
  return data;
};

export const fetchSanityFooter = async (): Promise<FOOTER_QUERYResult> => {
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
}): Promise<PAGE_QUERYResult> => {
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
}): Promise<PAGES_SLUGS_QUERYResult> => {
  const { data } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    params: { pageType },
    perspective: "published",
    stega: false,
  });

  return data;
};

// Authors
export const fetchSanityAuthorBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<AUTHOR_QUERYResult> => {
  const { data } = await sanityFetch({
    query: AUTHOR_QUERY,
    params: { slug, offset: 0, end: 0 },
  });
  return data;
};

export const fetchSanityAuthorWithResources = async ({
  slug,
  page,
  limit,
}: {
  slug: string;
  page?: number;
  limit: number;
}): Promise<AUTHOR_QUERYResult> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit;

  const { data } = await sanityFetch({
    query: AUTHOR_QUERY,
    params: { slug, offset, end },
  });
  return data;
};

export const fetchSanityAuthorsStaticParams =
  async (): Promise<AUTHOR_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: AUTHOR_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };

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
}): Promise<BLOG_QUERYResult> => {
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
}): Promise<BLOG_SLUG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: BLOG_SLUG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityBlogSlugsStaticParams =
  async (): Promise<BLOG_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: BLOG_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };

// Case Studies
export const fetchSanityCaseStudiesIndexPage = async ({
  category,
  page,
  limit,
  topic,
}: {
  category?: string;
  page?: number;
  limit: number;
  topic?: string;
}): Promise<CASE_STUDIES_QUERYResult> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit - 1;

  const { data } = await sanityFetch({
    query: CASE_STUDIES_QUERY,
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

export const fetchSanityCaseStudiesSlugPage = async ({
  slug,
}: {
  slug: string;
}): Promise<CASE_STUDIES_SLUG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: CASE_STUDIES_SLUG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityCaseStudiesSlugsStaticParams =
  async (): Promise<CASE_STUDIES_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: CASE_STUDIES_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };

export const fetchSanityResourceCategoryCount = async ({
  category,
  topic,
  type,
}: {
  category?: string;
  topic?: string;
  type: "post" | "case-study" | "resource";
}): Promise<RESOURCE_CATEGORY_COUNT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: RESOURCE_CATEGORY_COUNT_QUERY,
    params: { category: category ?? null, topic: topic ?? null, type: type },
  });
  return data;
};

export const fetchSanityResourceTopicsCount = async ({
  type,
  topic,
  category,
}: {
  type?: string;
  topic?: string;
  category?: string;
}): Promise<RESOURCE_TOPICS_COUNT_QUERYResult> => {
  const { data } = await sanityFetch({
    query: RESOURCE_TOPICS_COUNT_QUERY,
    params: { type: type, topic: topic ?? null, category: category ?? null },
  });
  return data;
};

// Resources
export const fetchSanityResourceIndexPage = async ({
  category,
  page,
  limit,
  topic,
}: {
  category?: string;
  page?: number;
  limit: number;
  topic?: string;
}): Promise<RESOURCE_QUERYResult> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit - 1;

  const { data } = await sanityFetch({
    query: RESOURCE_QUERY,
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

export const fetchSanityResourceSlugPage = async ({
  slug,
}: {
  slug: string;
}): Promise<RESOURCE_SLUG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: RESOURCE_SLUG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityResourceSlugsStaticParams =
  async (): Promise<RESOURCE_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: RESOURCE_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };

// Events

export const fetchSanityEventsIndexPage = async ({
  category,
  page,
  limit,
  topic,
}: {
  category?: string;
  page?: number;
  limit: number;
  topic?: string;
}): Promise<EVENTS_QUERYResult> => {
  const offset = page && limit ? (page - 1) * limit : 0;
  const end = offset + limit - 1;

  const { data } = await sanityFetch({
    query: EVENTS_QUERY,
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

export const fetchSanityEventsSlugPage = async ({
  slug,
}: {
  slug: string;
}): Promise<EVENTS_SLUG_QUERYResult> => {
  const { data } = await sanityFetch({
    query: EVENTS_SLUG_QUERY,
    params: { slug },
  });

  return data;
};

export const fetchSanityEventsSlugsStaticParams =
  async (): Promise<EVENTS_SLUGS_QUERYResult> => {
    const { data } = await sanityFetch({
      query: EVENTS_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    return data;
  };
