import type { NextParams } from "@/lib/utils/types";
import { notFound } from "next/navigation";
import {
  fetchSanityPageBySlug,
  fetchSanityPagesStaticParams,
} from "@/sanity/lib/fetch";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

export async function generateStaticParams() {
  const pages = await fetchSanityPagesStaticParams({ pageType: "page" });
  const staticParams = pages.map((page) => ({
    slug: page.slug?.current,
  }));

  return staticParams;
}

export async function generateMetadata({ params }: { params: NextParams }) {
  const { slug } = await params;
  const page = await fetchSanityPageBySlug({
    pageType: "page",
    slug: slug,
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function SlugPage({ params }: { params: NextParams }) {
  const { slug } = await params;
  const page = await fetchSanityPageBySlug({
    pageType: "page",
    slug: slug,
  });

  if (!page) return notFound();

  return <Page page={page} />;
}
