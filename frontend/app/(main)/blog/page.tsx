import { notFound } from "next/navigation";
import { fetchSanityBlogIndexPage } from "@/sanity/lib/fetch";
import JSONLDScript from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { generatePageMetadata } from "@/lib/site/metadata";

const _ROUTE = "blog";
// TODO: change back to 12 when there are enough posts
export const ITEMS_PER_RESOURCE_PAGE = 3;

export async function generateMetadata() {
  const page = await fetchSanityBlogIndexPage({
    limit: ITEMS_PER_RESOURCE_PAGE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function BlogIndexPage(props: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { topic, page } = searchParams;

  const [data] = await Promise.all([
    fetchSanityBlogIndexPage({
      topic: topic,
      page: page ? parseInt(page) : 1,
      limit: ITEMS_PER_RESOURCE_PAGE,
    }),
  ]);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <JSONLDScript document={data} />
      <ModuleBuilder modules={data?.modules ?? []} />
    </>
  );
}
