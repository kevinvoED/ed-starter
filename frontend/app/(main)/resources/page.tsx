import { notFound } from "next/navigation";
import {
  fetchSanityResourceCategoryCount,
  fetchSanityResourceIndexPage,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";

const _ROUTE = "resources";
const TYPE = "resource";

export async function generateMetadata() {
  const page = await fetchSanityResourceIndexPage({
    limit: ITEMS_PER_RESOURCE_PAGE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function ResourceIndexPage(props: {
  searchParams: Promise<{
    category?: string;
    topic?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { category, topic, page } = searchParams;
  const [data, _categoriesCount, _topicCountt] = await Promise.all([
    fetchSanityResourceIndexPage({
      category: category,
      page: page ? parseInt(page) : 1,
      limit: ITEMS_PER_RESOURCE_PAGE,
      topic: topic,
    }),
    fetchSanityResourceCategoryCount({
      category: category,
      topic: topic,
      type: TYPE,
    }),
    fetchSanityResourceTopicsCount({
      topic: topic,
      category: category,
      type: TYPE,
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
