import type { ContentType } from "@/lib/utils/types";
import { notFound } from "next/navigation";
import { fetchContentTypeIndexPageData } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { ContentPagination } from "@/components/layout/Content/ContentPagination";
import { ContentTopicFilter } from "@/components/layout/Content/ContentTopicFilter";
import { Page } from "@/components/layout/Page/Page";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";
import { createPageUrl } from "@/lib/utils/pagination";

const CONTENT_TYPE: ContentType = "case-studies-index";

export async function generateMetadata() {
  const page = await fetchContentTypeIndexPageData({
    contentType: CONTENT_TYPE,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    topic?: string;
    category?: string;
  }>;
}) {
  const { topic, page, category } = await searchParams;

  const data = await fetchContentTypeIndexPageData({
    contentType: CONTENT_TYPE,
    category: category,
    topic: topic,
    page: page ? parseInt(page) : 1,
  });

  if (!data) return notFound();

  return (
    <Page page={data}>
      <div className="flex flex-col gap-y-10 p-custom py-20">
        <header>
          {data.title && <PortableText value={data.title} slot="h1" />}
          {data.description && <PortableText value={data.description} />}
        </header>

        <ContentTopicFilter data={data.filters} />

        <ul className="grid-custom" id={data?.pagination.scrollTargetId || ""}>
          {data?.posts?.map((post, index) => (
            <li key={post._id} className="col-span-3">
              <Transition
                delay={index * 0.15}
                className="flex flex-col gap-y-50 rounded border border-black/5 bg-black/5 p-4 text-black"
              >
                <div className="flex gap-2">
                  {post._createdAt && (
                    <p className="max-w-fit rounded-full bg-black px-2 py-0.5 font-semibold text-white text-xs">
                      {new Date(post._createdAt).toLocaleDateString()}
                    </p>
                  )}
                  {post.category?.map(({ _id, title }) => (
                    <div
                      key={_id}
                      className="max-w-fit rounded-full bg-black px-2 py-0.5 font-semibold text-white text-xs"
                    >
                      <PortableText value={title} />
                    </div>
                  ))}

                  {post.contentTopic?.map(({ _id, title }) => (
                    <div
                      key={_id}
                      className="max-w-fit rounded-full bg-black px-2 py-0.5 font-semibold text-white text-xs"
                    >
                      <PortableText value={title} key={_id} />
                    </div>
                  ))}
                </div>

                <SanityLink
                  id="cta"
                  href={post.href}
                  variant="ghost"
                  card
                  hasArrow={false}
                  width="fit"
                >
                  <PortableText value={post.title} className="type-body-1650" />
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
    </Page>
  );
}
