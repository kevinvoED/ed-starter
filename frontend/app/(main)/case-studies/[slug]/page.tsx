import { notFound } from "next/navigation";
import {
  FETCH_CONTENT_TYPE_SLUG_PAGE_DATA,
  FETCH_CONTENT_TYPE_SLUGS_STATIC_PARAMS_DATA,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/animations/Transition";
import { JSONLDScript } from "@/components/layout/JsonLD/Jsonld";
import { ModuleBuilder } from "@/components/modules/ModuleBuilder";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/site/metadata";

const CONTENT_TYPE = "case-studies-index";

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

  return generatePageMetadata(post!);
}

export default async function CaseStudiesPostPage(props: {
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

  console.log(post);

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
      <ModuleBuilder modules={post?.modules ?? []} />
    </>
  );
}
