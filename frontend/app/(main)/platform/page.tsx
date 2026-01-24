import { notFound } from "next/navigation";
import { fetchSanityPageBySlug } from "@/sanity/lib/fetch";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata() {
  const page = await fetchSanityPageBySlug({
    pageType: "platform-index",
    slug: "platform",
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function PlatformIndexPage() {
  const page = await fetchSanityPageBySlug({
    pageType: "platform-index",
    slug: "platform",
  });

  if (!page) {
    return notFound();
  }

  return (
    <>
      <JSONLDScript document={page} />
      <ModuleBuilder blocks={page?.blocks ?? []} />
    </>
  );
}
