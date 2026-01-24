import { notFound } from "next/navigation";
import {
  fetchSanityEventsIndexPage,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { Pagination } from "@/components/Pagination/Pagination";
import { PostCard } from "@/components/Post/PostCard";
import { PostFeaturedCard } from "@/components/Post/PostFeaturedCard";
import { PostTopicFilter } from "@/components/Post/PostTopicFilter";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ResourceContent } from "@/components/Resource/ResourceContent";
import { ResourceFilterContainer } from "@/components/Resource/ResourceFilterContainer";
import { ResourcePostContainer } from "@/components/Resource/ResourcePostContainer";
import { ResourcePostList } from "@/components/Resource/ResourcePostList";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";
import { createPageUrl, getResourcePostSize } from "@/lib/utils";

const ROUTE = "events";

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

  const [data, topicCount] = await Promise.all([
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

        <ResourceContent>
          {data.featuredPost && (
            <Transition className="col-span-full lg:col-span-10 lg:col-start-3">
              <PostFeaturedCard {...data.featuredPost} route={ROUTE} />
            </Transition>
          )}

          <ResourcePostList
            className="grid-custom col-span-full gap-y-6"
            id={`${ROUTE}-posts-list`}
          >
            <ResourceFilterContainer className="col-span-full lg:col-span-2 lg:row-start-2 lg:divide-y lg:divide-alabaster">
              <PostTopicFilter topicCount={topicCount} />
            </ResourceFilterContainer>

            <Transition className="col-span-full row-start-2 lg:col-start-3 lg:row-start-1">
              <h2 className="type-heading-2430">Latest Events & Webinars</h2>
            </Transition>

            {data.posts && data.posts.length > 0 && (
              <ResourcePostContainer>
                {data.posts?.map((post, index) => {
                  const { variant, className } = getResourcePostSize(index + 1);

                  return (
                    <Transition
                      key={post._id}
                      delay={index * 0.1}
                      className={className}
                    >
                      <PostCard route={ROUTE} {...post} variant={variant} />
                    </Transition>
                  );
                })}
              </ResourcePostContainer>
            )}

            {data.posts && data.posts.length > 0 && (
              <Pagination
                totalPages={Math.ceil(
                  topicCount.currentTopicPostCount / ITEMS_PER_RESOURCE_PAGE,
                )}
                currentPage={page ? parseInt(page) : 1}
                createPageUrl={(pageNum) =>
                  createPageUrl({ route: ROUTE, pageNum, topic })
                }
                className="col-span-full row-start-4 place-self-start lg:row-start-3 lg:place-self-end"
                scrollTargetId={`${ROUTE}-posts-list`}
              />
            )}
          </ResourcePostList>
        </ResourceContent>

        <ModuleBuilder blocks={data?.blocks ?? []} />
      </ResourceContainer>
    </>
  );
}
