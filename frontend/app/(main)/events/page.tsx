import { notFound } from "next/navigation";
import {
  fetchSanityEventsIndexPage,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";

const _ROUTE = "events";

export async function generateMetadata() {
  const page = await fetchSanityEventsIndexPage({
    limit: ITEMS_PER_RESOURCE_PAGE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function EventsIndexPage(props: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { topic, page } = searchParams;

  const [data, _topicCount] = await Promise.all([
    fetchSanityEventsIndexPage({
      topic: topic,
      page: page ? parseInt(page) : 1,
      limit: ITEMS_PER_RESOURCE_PAGE,
    }),
    fetchSanityResourceTopicsCount({
      topic: topic,
      type: "event",
    }),
  ]);

  if (!data) {
    notFound();
  }

  return (
    <>
      <JSONLDScript document={data} />
      <ResourceContainer className="bg-platinum pt-31 md:pt-35">
        {data.title && (
          <HeroResource title={data?.title} description={data?.description} />
        )}

        <ModuleBuilder blocks={data?.blocks ?? []} />
      </ResourceContainer>
    </>
  );
}
