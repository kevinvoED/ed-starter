import { notFound } from "next/navigation";
import {
  FETCH_CONTENT_TYPE_SLUG_PAGE_DATA,
  FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA,
} from "@/sanity/lib/fetch";
import { Page } from "@/components/layout/Page/Page";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE = "blog-index";

export async function generateStaticParams() {
  const posts = await FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA({
    contentType: CONTENT_TYPE,
  });

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await FETCH_CONTENT_TYPE_SLUG_PAGE_DATA({
    contentType: CONTENT_TYPE,
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return generatePageMetadata(post);
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await FETCH_CONTENT_TYPE_SLUG_PAGE_DATA({
    contentType: CONTENT_TYPE,
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return (
    <Page page={post} className="p-custom">
      {post.content && <PortableText value={post.content} style="article" />}
    </Page>
  );
}
