import { notFound } from "next/navigation";
import { FETCH_CONTENT_TYPE_INDEX_PAGE_DATA } from "@/sanity/lib/fetch";
import JSONLDScript from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { generatePageMetadata } from "@/lib/site/metadata";

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
    page?: string;
    topic?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const { topic, page } = searchParams;

  const [data] = await Promise.all([
    FETCH_CONTENT_TYPE_INDEX_PAGE_DATA({
      contentType: CONTENT_TYPE,
      topic: topic,
      page: page ? parseInt(page) : 1,
    }),
  ]);

  if (!data) {
    return notFound();
  }

  return (
    <>
      CASE STUDIESPAGE
      <JSONLDScript document={data} />
      <ModuleBuilder modules={data?.modules ?? []} />
    </>
  );
}
