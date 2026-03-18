import type { NextParams } from "@/lib/utils/types";
import { notFound } from "next/navigation";
import {
  FETCH_CONTENT_TYPE_SLUG_PAGE_DATA,
  FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA,
} from "@/sanity/lib/fetch";
import { Page } from "@/components/layout/Page/Page";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE = "case-studies-index";

export async function generateStaticParams() {
  const posts = await FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA({
    contentType: CONTENT_TYPE,
  });

  const staticParams = posts.map((post) => ({
    slug: post.slug?.current,
  }));

  return staticParams;
}

export async function generateMetadata({ params }: { params: NextParams }) {
  const { slug } = await params;
  const post = await FETCH_CONTENT_TYPE_SLUG_PAGE_DATA({
    contentType: CONTENT_TYPE,
    slug: slug,
  });

  if (!post) return notFound();

  return generatePageMetadata(post);
}

export default async function CaseStudiesPostPage({
  params,
}: {
  params: NextParams;
}) {
  const { slug } = await params;
  const post = await FETCH_CONTENT_TYPE_SLUG_PAGE_DATA({
    contentType: CONTENT_TYPE,
    slug: slug,
  });

  if (!post) return notFound();

  return (
    <Page page={post}>
      {post.content && <PortableText value={post.content} style="article" />}
    </Page>
  );
}
