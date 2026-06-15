import type { ContentType } from "@/lib/utils/types";
import { notFound } from "next/navigation";
import { fetchContentTypeIndexPageData } from "@/sanity/lib/fetch";
import { ContentFilter } from "@/components/layout/Content/ContentFilter";
import { ContentHero } from "@/components/layout/Content/ContentHero";
import { ContentListing } from "@/components/layout/Content/ContentListing";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE: ContentType = "case-studies-index";

export async function generateMetadata() {
  const page = await fetchContentTypeIndexPageData({
    contentType: CONTENT_TYPE,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    category?: string;
  }>;
}) {
  const { topic, page, category } = await searchParams;

  const data = await fetchContentTypeIndexPageData({
    contentType: CONTENT_TYPE,
    category: category,
    topic: topic,
    page: page ? parseInt(page) : 1,
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

      <ContentPagination
        pagination={data?.pagination}
        currentPage={page ? parseInt(page) : 1}
      />
    </Page>
  );
}
