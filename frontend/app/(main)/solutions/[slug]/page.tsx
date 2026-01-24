import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import notFound from "@/app/not-found";
import JSONLDScript, {
  type JSONLDScriptProps,
} from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams({
    pageType: "solutions-child",
  });

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({
    pageType: "solutions-child",
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
    pageType: "solutions-child",
    slug: params.slug,
  });

  if (!page) {
    notFound();
  }

  return (
    <>
      <JSONLDScript document={page as JSONLDScriptProps["document"]} />
      <ModuleBuilder blocks={page?.blocks ?? []} />
    </>
  );
}
