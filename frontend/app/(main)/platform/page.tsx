import { notFound } from "next/navigation";
import { fetchPageSlugData } from "@/sanity/lib/fetch";
import { Page } from "@/components/layout/Page/Page";
import { generatePageMetadata } from "@/lib/site/metadata";

export async function generateMetadata() {
  const page = await fetchPageSlugData({
    pageType: "platform-index",
    slug: "platform",
  });

  if (!page) return notFound();

  return generatePageMetadata(page);
}

export default async function PlatformIndexPage() {
  const page = await fetchPageSlugData({
    pageType: "platform-index",
    slug: "platform",
  });

  if (!page) return notFound();

  return <Page page={page} />;
}
