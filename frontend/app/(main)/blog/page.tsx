import { notFound } from "next/navigation";
import {
  fetchSanityBlogIndexPage,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";

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

  const [data, _topicCount] = await Promise.all([
    fetchSanityBlogIndexPage({
      topic: topic,
      page: page ? parseInt(page) : 1,
      limit: ITEMS_PER_RESOURCE_PAGE,
    }),
    fetchSanityResourceTopicsCount({
      topic: topic,
      type: "post",
    }),
  ]);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <JSONLDScript document={data} />
      <ResourceContainer>
        {data.title && (
          <HeroResource title={data?.title} description={data?.description} />
        )}

        <ModuleBuilder blocks={data?.blocks ?? []} />
      </ResourceContainer>
    </>
  );
}
