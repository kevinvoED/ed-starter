import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { fetchPageSlugData } from "@/sanity/lib/fetch";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetchMetadata,
} from "@/sanity/lib/live";
import { PAGE_SLUG_QUERY } from "@/sanity/queries/queries";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

const PAGE_TYPE = "platform-index";
const PAGE_SLUG = "platform";

export async function generateMetadata() {
  const { perspective } = await getDynamicFetchOptions();
  const { data: page } = await sanityFetchMetadata({
    query: PAGE_SLUG_QUERY,
    params: { pageType: PAGE_TYPE, slug: PAGE_SLUG, parentSlug: null },
    perspective,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function PlatformIndexPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicPlatformPage />
      </Suspense>
    );
  }

  return <CachedPlatformPage perspective="published" stega={false} />;
}

async function DynamicPlatformPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedPlatformPage perspective={perspective} stega={stega} />;
}

async function CachedPlatformPage({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const page = await fetchPageSlugData({
    pageType: PAGE_TYPE,
    slug: PAGE_SLUG,
    perspective,
    stega,
  });

  if (!page) return notFound();

  return <Page page={page} />;
}
