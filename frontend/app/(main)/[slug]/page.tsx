import { notFound } from "next/navigation";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import JSONLDScript from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { generatePageMetadata } from "@/lib/site/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams({ pageType: "page" });

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({
    pageType: "page",
    slug: params.slug,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({
    pageType: "page",
    slug: params.slug,
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <JSONLDScript document={page} />
      <ModuleBuilder modules={page?.modules ?? []} />
    </>
  );
}
