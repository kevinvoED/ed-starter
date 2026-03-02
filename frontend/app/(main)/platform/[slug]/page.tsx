import { notFound } from "next/navigation";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams({
    pageType: "platform-child",
  });

  return pages.map((page) => ({
    slug: page.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({
    pageType: "platform-child",
    slug: params.slug,
  });

  if (!page) {
    notFound();
  }

  return generatePageMetadata(page!);
}

export default async function PlatformChildPage(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await props.params;
  const page = await fetchSanityPageBySlug({
    pageType: "platform-child",
    slug: params.slug,
  });

  if (!page) {
    notFound();
  }

  return <Page page={page} />;
}
