import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { fetchPageSlugData, fetchSanityOrganization } from "@/sanity/lib/fetch";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetchMetadata,
} from "@/sanity/lib/live";
import { PAGE_SLUG_QUERY } from "@/sanity/queries/queries";
import { OrganizationJSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

const PAGE_TYPE = "page";
const PAGE_SLUG = "index";

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

export default async function IndexPage() {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicIndexPage />
      </Suspense>
    );
  }

  return <CachedIndexPage perspective="published" stega={false} />;
}

async function DynamicIndexPage() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedIndexPage perspective={perspective} stega={stega} />;
}

async function CachedIndexPage({ perspective, stega }: DynamicFetchOptions) {
  "use cache";
  const [page, organization] = await Promise.all([
    fetchPageSlugData({
      pageType: PAGE_TYPE,
      slug: PAGE_SLUG,
      perspective,
      stega,
    }),
    fetchSanityOrganization({ perspective, stega }),
  ]);

  if (!page) return notFound();

  return (
    <Page page={page} disableJsonLd={true}>
      {organization && <OrganizationJSONLDScript organization={organization} />}
    </Page>
  );
}
