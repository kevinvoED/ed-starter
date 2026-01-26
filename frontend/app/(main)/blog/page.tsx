import { notFound } from "next/navigation";
import { fetchSanityBlogIndexPage } from "@/sanity/lib/fetch";
import JSONLDScript from "@/components/miscellaneous/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/site/metadata";

const _ROUTE = "blog";

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
