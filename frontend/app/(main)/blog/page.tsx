import { notFound } from "next/navigation";
import { FETCH_CONTENT_TYPE_INDEX_PAGE_DATA } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { ContentCategoryFilter } from "@/components/layout/Content/ContentCategoryFilter";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { ContentTopicFilter } from "@/components/layout/Content/ContentTopicFilter";
import { Page } from "@/components/layout/Page/Page";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";
import { createPageUrl } from "@/lib/utils/pagination";

const CONTENT_TYPE = "blog-index";

export async function generateMetadata() {
  const page = await FETCH_CONTENT_TYPE_INDEX_PAGE_DATA({
    contentType: CONTENT_TYPE,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page);
}

export default async function BlogIndexPage(props: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { topic, page, category } = searchParams;

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
    <Page page={data}>
      <div className="flex flex-col gap-y-10 p-custom py-20">
        <header>
          {data.title && (
            <PortableText value={data.title} slot="h1" className="type-4860" />
          )}
          {data.description && <PortableText value={data.description} />}
        </header>

        <ContentCategoryFilter data={data.categoryFilter} />
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
                  <PortableText value={category.title} key={category._id} />
                ))}

                {post.contentTopic?.map((category) => (
                  <PortableText value={category.title} key={category._id} />
                ))}

                <SanityLink
                  id="cta"
                  href={post.href}
                  variant="ghost"
                  card
                  hasArrow={false}
                  width="fit"
                >
                  <PortableText value={post.title} />
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
            createPageUrl({ route: "blog", pageNum, category, topic })
          }
          className="col-span-full self-start"
        />
      )}
    </Page>
  );
}
