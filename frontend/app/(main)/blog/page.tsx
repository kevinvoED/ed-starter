import type { ContentType } from "@/lib/utils/types";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchContentTypeIndexPageData } from "@/sanity/lib/fetch";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetchMetadata,
} from "@/sanity/lib/live";
import { GET_CONTENT_TYPE_INDEX_QUERY } from "@/sanity/queries/queries";
import { ContentFilter } from "@/components/layout/Content/ContentFilter";
import { ContentHero } from "@/components/layout/Content/ContentHero";
import { ContentListing } from "@/components/layout/Content/ContentListing";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE: ContentType = "blog-index";

export async function generateMetadata() {
  const { perspective } = await getDynamicFetchOptions();
  const { data: page } = await sanityFetchMetadata({
    query: GET_CONTENT_TYPE_INDEX_QUERY,
    params: {
      contentType: CONTENT_TYPE,
      category: null,
      topic: null,
      page: 1,
      offset: 0,
      end: 2,
      limit: 3,
    },
    perspective,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    category?: string;
  }>;
}) {
  return (
    <Suspense>
      <DynamicBlogIndexPage searchParams={searchParams} />
    </Suspense>
  );
}

async function DynamicBlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; topic?: string; category?: string }>;
}) {
  const [{ topic, page, category }, { perspective, stega }] = await Promise.all(
    [searchParams, getDynamicFetchOptions()],
  );

  return (
    <CachedBlogIndexPage
      topic={topic}
      page={page}
      category={category}
      perspective={perspective}
      stega={stega}
    />
  );
}

async function CachedBlogIndexPage({
  topic,
  page,
  category,
  perspective,
  stega,
}: {
  topic?: string;
  page?: string;
  category?: string;
} & DynamicFetchOptions) {
  "use cache";
  const data = await fetchContentTypeIndexPageData({
    contentType: CONTENT_TYPE,
    category,
    topic,
    page: page ? parseInt(page) : 1,
    perspective,
    stega,
  });

  if (!data || data._type !== CONTENT_TYPE) return notFound();

  return (
    <Page
      page={data}
      className="grid-custom f-gap-10/20 bg-porcelain p-custom py-20"
    >
      <ContentHero title={data.title} description={data.description} />
      <ContentFilter data={data.filters} />

      <ContentListing
        scrollTargetId={data?.pagination.scrollTargetId}
        posts={data?.posts}
      />

      {data.posts && data.posts.length > 0 && (
        <ContentPagination
          pagination={data?.pagination}
          currentPage={page ? parseInt(page) : 1}
        />
      )}
    </Page>
  );
}
