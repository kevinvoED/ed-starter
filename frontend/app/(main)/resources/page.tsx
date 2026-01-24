import { notFound } from "next/navigation";
import {
  fetchSanityResourceCategoryCount,
  fetchSanityResourceIndexPage,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { Pagination } from "@/components/Pagination/Pagination";
import { PostCard } from "@/components/Post/PostCard";
import { PostCategoryFilter } from "@/components/Post/PostCategoryFilter";
import { PostTopicFilter } from "@/components/Post/PostTopicFilter";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ResourceContent } from "@/components/Resource/ResourceContent";
import { ResourceFilterContainer } from "@/components/Resource/ResourceFilterContainer";
import { ResourcePostContainer } from "@/components/Resource/ResourcePostContainer";
import { ResourcePostList } from "@/components/Resource/ResourcePostList";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";
import { createPageUrl, getResourcePostSize } from "@/lib/utils";

const ROUTE = "resources";
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
  const [data, categoriesCount, topicCount] = await Promise.all([
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

        <ResourceContent>
          <ResourcePostList id={`${ROUTE}-posts-list`}>
            <ResourceFilterContainer>
              <PostCategoryFilter
                route={ROUTE}
                categoriesCount={categoriesCount}
                className="row-start-2 lg:pb-10"
              />
              <PostTopicFilter
                topicCount={topicCount}
                className="row-start-3"
              />
            </ResourceFilterContainer>

            {data.posts && data.posts.length > 0 && (
              <ResourcePostContainer className="row-start-2">
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
                  categoriesCount.currentCategoryPostCount /
                    ITEMS_PER_RESOURCE_PAGE,
                )}
                currentPage={page ? parseInt(page) : 1}
                createPageUrl={(pageNum) =>
                  createPageUrl({ route: ROUTE, pageNum, category, topic })
                }
                className="col-span-full row-start-3 place-self-start lg:place-self-end"
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
