import { notFound } from "next/navigation";
import { FETCH_CONTENT_TYPE_INDEX_PAGE_DATA } from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { ContentCategoryFilter } from "@/components/layout/Content/ContentCategoryFilter";
import { JSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { Button } from "@/components/primitives/Button/Button";
import { PortableTextFragment } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE = "blog-index";

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

  console.log(data);
  return (
    <>
      <JSONLDScript document={data} />

      <div className="flex flex-col gap-y-10 p-custom py-20">
        <header className="">
          {data.title && (
            <h1 className="type-4860">
              <PortableTextFragment value={data.title} />
            </h1>
          )}
          {data.description && (
            <p>
              <PortableTextFragment value={data.description} />
            </p>
          )}
        </header>

        <ContentCategoryFilter data={data.categoryFilter} />

        <ul className="grid-custom">
          {data?.posts?.map((post) => (
            <li key={post._id} className="col-span-3">
              <Transition className="flex flex-col gap-y-20 rounded bg-white p-4 text-black">
                {post._createdAt && (
                  <p>{new Date(post._createdAt).toLocaleDateString()}</p>
                )}

                {post.category?.map((category) => (
                  <p key={category._id}>
                    <PortableTextFragment value={category.title} />
                  </p>
                ))}

                <Button
                  href={`/blog/${post.slug.current}`}
                  variant="ghost"
                  card
                  hasArrow={false}
                  width="fit"
                >
                  <PortableTextFragment value={post.title} />
                </Button>
              </Transition>
            </li>
          ))}
        </ul>
      </div>

      {/* Remove the ModuleBuilder if you do not need to render specific modules here like Driver modules */}
      <ModuleBuilder modules={data?.modules ?? []} />
    </>
  );
}
