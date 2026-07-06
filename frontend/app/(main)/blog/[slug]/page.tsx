import type { ContentType, NextParams } from "@/lib/utils/types";
import { Suspense } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import {
  fetchContentTypeSlugPageData,
  fetchContentTypeSlugStaticParamsData,
} from "@/sanity/lib/fetch";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetchMetadata,
} from "@/sanity/lib/live";
import { GET_CONTENT_TYPE_SLUG_QUERY } from "@/sanity/queries/queries";
import { Page } from "@/components/layout/Page/Page";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE: ContentType = "blog-index";

export async function generateStaticParams() {
  const posts = await fetchContentTypeSlugStaticParamsData({
    contentType: CONTENT_TYPE,
  });
  return posts.map((post) => ({ slug: post.slug?.current }));
}

export async function generateMetadata({ params }: { params: NextParams }) {
  const [{ slug }, { perspective }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  const { data: post } = await sanityFetchMetadata({
    query: GET_CONTENT_TYPE_SLUG_QUERY,
    params: { contentType: CONTENT_TYPE, slug },
    perspective,
  });

  if (!post) return notFound();

  return generatePageMetadata(post);
}

export default async function BlogPostPage({ params }: { params: NextParams }) {
  const { isEnabled: isDraftMode } = await draftMode();

  if (isDraftMode) {
    return (
      <Suspense>
        <DynamicBlogPostPage params={params} />
      </Suspense>
    );
  }

  const { slug } = await params;
  return (
    <CachedBlogPostPage slug={slug} perspective="published" stega={false} />
  );
}

async function DynamicBlogPostPage({
  params,
}: Pick<{ params: NextParams }, "params">) {
  const [{ slug }, { perspective, stega }] = await Promise.all([
    params,
    getDynamicFetchOptions(),
  ]);
  return (
    <CachedBlogPostPage slug={slug} perspective={perspective} stega={stega} />
  );
}

async function CachedBlogPostPage({
  slug,
  perspective,
  stega,
}: { slug: string } & DynamicFetchOptions) {
  "use cache";
  const post = await fetchContentTypeSlugPageData({
    contentType: CONTENT_TYPE,
    slug,
    perspective,
    stega,
  });

  if (!post) return notFound();

  return (
    <Page page={post}>
      {post.content && <PortableText value={post.content} style="article" />}
    </Page>
  );
}
