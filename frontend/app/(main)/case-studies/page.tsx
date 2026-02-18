import { notFound } from "next/navigation";
import { FETCH_CONTENT_TYPE_INDEX_PAGE_DATA } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { ContentTopicFilter } from "@/components/layout/Content/ContentTopicFilter";
import { JSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableTextFragment } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";
import { createPageUrl } from "@/lib/utils/pagination";

const CONTENT_TYPE = "case-studies-index";

export async function generateMetadata() {
  const page = await FETCH_CONTENT_TYPE_INDEX_PAGE_DATA({
    contentType: CONTENT_TYPE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function BlogIndexPage(props: {
  searchParams: Promise<{
    category?: string;
    page?: string;
    topic?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { category, topic, page } = searchParams;

  const [data] = await Promise.all([
    FETCH_CONTENT_TYPE_INDEX_PAGE_DATA({
      contentType: CONTENT_TYPE,
      category: category,
      topic: topic,
      page: page ? parseInt(page) : 1,
    }),
  ]);

  if (!data) {
    return notFound();
  }

  return (
    <>
      <JSONLDScript document={data} />

      <div className="flex flex-col gap-y-10 p-custom py-20">
        <header>
          {data.title && (
            <h1>
              <PortableTextFragment value={data.title} />
            </h1>
          )}
          {data.description && (
            <p>
              <PortableTextFragment value={data.description} />
            </p>
          )}
        </header>

        <ContentTopicFilter data={data.topicFilter} />

        <ul className="grid-custom" id={data?.pagination.scrollTargetId || ""}>
          {data?.posts?.map((post, index) => (
            <li key={post._id} className="col-span-3">
              <Transition
                delay={index * 0.15}
                className="flex flex-col gap-y-20 rounded bg-white p-4 text-black"
              >
                {post._createdAt && (
                  <p>{new Date(post._createdAt).toLocaleDateString()}</p>
                )}

                {post.category?.map((category) => (
                  <p key={category._id}>
                    <PortableTextFragment value={category.title} />
                  </p>
                ))}

                {post.contentTopic?.map((category) => (
                  <p key={category._id}>
                    <PortableTextFragment value={category.title} />
                  </p>
                ))}

                <SanityLink
                  id="cta"
                  href={`/blog/${post.slug.current}`}
                  variant="ghost"
                  card
                  hasArrow={false}
                  width="fit"
                >
                  <PortableTextFragment value={post.title} />
                </SanityLink>
              </Transition>
            </li>
          ))}
        </ul>
      </div>

      {data.posts && data.posts.length > 0 && (
        <ContentPagination
          scrollTargetId={data?.pagination.scrollTargetId || ""}
          totalPages={data?.pagination?.totalPages}
          currentPage={page ? parseInt(page) : 1}
          createPageUrl={(pageNum) =>
            createPageUrl({ route: "case-studies", pageNum, category, topic })
          }
          className="col-span-full self-start"
        />
      )}

      {/* Remove the ModuleBuilder if you do not need to render specific modules here like Driver modules */}
      <ModuleBuilder modules={data?.modules ?? []} />
    </>
  );
}
