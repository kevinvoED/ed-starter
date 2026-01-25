import { notFound } from "next/navigation";
import {
  fetchSanityOrganization,
  fetchSanityPageBySlug,
} from "@/sanity/lib/fetch";
import { OrganizationJSONLDScript } from "@/components/miscellaneous/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({ pageType: "page", slug: "index" });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function IndexPage() {
  const [page, organization] = await Promise.all([
    fetchSanityPageBySlug({ pageType: "page", slug: "index" }),
    fetchSanityOrganization(),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <>
      {organization && <OrganizationJSONLDScript organization={organization} />}
      <ModuleBuilder blocks={page?.blocks ?? []} />
    </>
  );
}
