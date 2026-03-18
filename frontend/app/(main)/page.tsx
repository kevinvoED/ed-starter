import { notFound } from "next/navigation";
import {
  fetchSanityOrganization,
  fetchSanityPageBySlug,
} from "@/sanity/lib/fetch";
import { OrganizationJSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import { Page } from "@/components/layout/Page/Page";
import { Starter } from "@/components/modules/Starter";
import { generatePageMetadata } from "@/lib/site/metadata";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ pageType: "page", slug: "index" });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function IndexPage() {
  const [page, organization] = await Promise.all([
    fetchSanityPageBySlug({ pageType: "page", slug: "index" }),
    fetchSanityOrganization(),
  ]);

  if (!page) return notFound();

  return (
    <Page page={page} disableJsonLd>
      {organization && <OrganizationJSONLDScript organization={organization} />}
      <Starter />
    </Page>
  );
}
