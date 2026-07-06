import type { NextParams } from "@/lib/utils/types";
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

const PAGE_TYPE = "platform-child";

export async function generateStaticParams() {
  const pages = await fetchPageStaticParamsData({ pageType: PAGE_TYPE });
  return pages.map((page) => ({ slug: page.slug?.current }));
}

export async function generateMetadata({ params }: { params: NextParams }) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const { data: page } = await sanityFetchMetadata({
    query: PAGE_SLUG_QUERY,
    params: { pageType: PAGE_TYPE, slug },
    perspective,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function PlatformChildPage({
  params,
}: {
  params: NextParams;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicPlatformChildPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return (
    <CachedPlatformChildPage
      slug={slug}
      perspective="published"
      stega={false}
    />
  );
}

async function DynamicPlatformChildPage({
  params,
}: Pick<{ params: NextParams }, "params">) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return (
    <CachedPlatformChildPage
      slug={slug}
      perspective={perspective}
      stega={stega}
    />
  );
}

async function CachedPlatformChildPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";
  const page = await fetchPageSlugData({
    pageType: PAGE_TYPE,
    slug,
    perspective,
    stega,
  });

  if (!page) return notFound();

  return <Page page={page} />;
}
