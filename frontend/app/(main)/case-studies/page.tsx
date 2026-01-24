import { notFound } from "next/navigation";
import {
  fetchSanityCaseStudiesIndexPage,
  fetchSanityResourceCategoryCount,
  fetchSanityResourceTopicsCount,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { HeroResource } from "@/components/Hero/HeroResource";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { Pagination } from "@/components/Pagination/Pagination";
import { PostCard } from "@/components/Post/PostCard";
import { PostCategoryFilter } from "@/components/Post/PostCategoryFilter";
import { PostFeaturedCard } from "@/components/Post/PostFeaturedCard";
import { PostTopicFilter } from "@/components/Post/PostTopicFilter";
import { ResourceContainer } from "@/components/Resource/ResourceContainer";
import { ResourceContent } from "@/components/Resource/ResourceContent";
import { ResourceFilterContainer } from "@/components/Resource/ResourceFilterContainer";
import { ResourcePostContainer } from "@/components/Resource/ResourcePostContainer";
import { ResourcePostList } from "@/components/Resource/ResourcePostList";
import { ITEMS_PER_RESOURCE_PAGE } from "@/lib/consts";
import { generatePageMetadata } from "@/lib/metadata";
import { createPageUrl } from "@/lib/utils";

const ROUTE = "case-studies";
const TYPE = "case-study";

export async function generateMetadata() {
  const page = await fetchSanityCaseStudiesIndexPage({
    limit: ITEMS_PER_RESOURCE_PAGE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function CaseStudiesIndexPage(props: {
  searchParams: Promise<{
    category?: string;
    topic?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { category, topic, page } = searchParams;
  const [data, categoriesCount, topicCount] = await Promise.all([
    fetchSanityCaseStudiesIndexPage({
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

        <ResourceContent className="lg:!gap-y-9 gap-y-15">
          {data.featuredPost && (
            <Transition className="col-span-full lg:col-span-10 lg:col-start-3">
              <PostFeaturedCard {...data.featuredPost} route={ROUTE} />
            </Transition>
          )}

          <ResourcePostList id={`${ROUTE}-posts-list`}>
            <ResourceFilterContainer className="col-span-full lg:col-span-2 lg:row-start-2 lg:divide-y lg:divide-alabaster">
              <PostCategoryFilter
                route={ROUTE}
                categoriesCount={categoriesCount}
                className="row-start-2 pb-10"
              />
              <PostTopicFilter
                topicCount={topicCount}
                className="row-start-3"
              />
            </ResourceFilterContainer>
            <Transition className="col-span-full row-start-2 lg:col-start-3 lg:row-start-1">
              <h2 className="type-heading-2430">Latest Case Studies</h2>
            </Transition>

            {data.posts && data.posts.length > 0 && (
              <ResourcePostContainer>
                {data.posts?.map((post, index) => {
                  return (
                    <Transition
                      key={post._id}
                      delay={index * 0.1}
                      className="col-span-full"
                    >
                      <PostCard route={ROUTE} {...post} variant="full" />
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
