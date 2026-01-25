import { notFound } from "next/navigation";
import {
  fetchSanityBlogSlugPage,
  fetchSanityBlogSlugsStaticParams,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/GSAP/Transition";
import JSONLDScript from "@/components/miscellaneous/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const posts = await fetchSanityBlogSlugsStaticParams();

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogSlugPage({
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return generatePageMetadata(post!);
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityBlogSlugPage({
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return (
    <>
      <JSONLDScript document={post} />
      <div className="grid-custom gap-y-20 bg-platinum p-custom pt-10 pb-20 lg:py-35">
        <Transition
          delay={0.3}
          className="col-span-full lg:col-span-8 lg:col-start-3"
        >
          {post.content && (
            <PortableText value={post.content} style="article" />
          )}
        </Transition>
      </div>
      <ModuleBuilder blocks={post?.blocks ?? []} />
    </>
  );
}
