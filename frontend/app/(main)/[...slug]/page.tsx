import type { NextCatchAllParams } from "@/lib/utils/types";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  fetchPageSlugData,
  fetchPageStaticParamsData,
} from "@/sanity/lib/fetch";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetchMetadata,
} from "@/sanity/lib/live";
import { PAGE_SLUG_QUERY } from "@/sanity/queries/queries";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

const PAGE_TYPE = "page";

// Only top-level pages and one level of nested (parentPage) pages are supported.
function parseSlugSegments(segments: string[]) {
  const [slug, parentSlug] =
    segments.length > 1
      ? [segments[segments.length - 1], segments[segments.length - 2]]
      : [segments[0], null];
  return { slug, parentSlug };
}

export async function generateStaticParams() {
  const pages = await fetchPageStaticParamsData({ pageType: PAGE_TYPE });
  return pages
    .filter((page) => page.slug?.current)
    .map((page) => ({
      slug: page.parentSlug
        ? [page.parentSlug, page.slug!.current]
        : [page.slug!.current],
    }));
}

export async function generateMetadata({
  params,
}: {
  params: NextCatchAllParams;
}) {
  const [{ slug: segments }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const { slug, parentSlug } = parseSlugSegments(segments);
  const { data: page } = await sanityFetchMetadata({
    query: PAGE_SLUG_QUERY,
    params: { pageType: PAGE_TYPE, slug, parentSlug },
    perspective,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function SlugPage({
  params,
}: {
  params: NextCatchAllParams;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicSlugPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return <CachedSlugPage slug={slug} perspective="published" stega={false} />;
}

async function DynamicSlugPage({
  params,
}: Pick<{ params: NextCatchAllParams }, "params">) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return <CachedSlugPage slug={slug} perspective={perspective} stega={stega} />;
}

async function CachedSlugPage({
  slug: segments,
  perspective,
  stega,
}: { slug: string[] } & DynamicFetchOptions) {
  "use cache";
  const { slug, parentSlug } = parseSlugSegments(segments);
  const page = await fetchPageSlugData({
    pageType: PAGE_TYPE,
    slug,
    parentSlug,
    perspective,
    stega,
  });

  if (!page) return notFound();

  return <Page page={page} />;
}
