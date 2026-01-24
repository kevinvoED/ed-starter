import { notFound } from "next/navigation";
import {
  fetchSanityEventsSlugPage,
  fetchSanityEventsSlugsStaticParams,
} from "@/sanity/lib/fetch";
import { Transition } from "@/components/GSAP/Transition";
import { HeroDetail } from "@/components/Hero/HeroDetail";
import { HeroGated } from "@/components/Hero/HeroGated";
import { SanityImage } from "@/components/Media/SanityImage";
import JSONLDScript from "@/components/Metadata/Jsonld";
import { ModuleBuilder } from "@/components/ModuleBuilder";
import { PortableText } from "@/components/PortableText/PortableText";
import { generatePageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await fetchSanityEventsSlugsStaticParams();

  return posts.map((post) => ({
    slug: post.slug?.current,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityEventsSlugPage({
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  return generatePageMetadata(post!);
}

export default async function EventsPostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityEventsSlugPage({
    slug: params.slug,
  });

  if (!post) {
    notFound();
  }

  const { isGated } = post;

  return (
    <>
      <JSONLDScript document={post} />
      <div
        className={cn(
          "grid-custom gap-y-20 p-custom pt-10 pb-20 lg:py-35",
          isGated ? "bg-black text-white" : "bg-platinum",
        )}
      >
        {isGated ? (
          <HeroGated eyebrow="Events" {...post} />
        ) : (
          <HeroDetail eyebrow="Events" {...post} />
        )}

        <Transition
          delay={0.3}
          className={cn(
            "col-span-full grid grid-cols-9 gap-x-5 lg:col-span-9 lg:col-start-3",
            isGated ? "border-gunmetal border-t pt-20" : "",
          )}
        >
          {isGated && (
            <>
              <div className="col-span-full space-y-20 lg:col-span-4">
                {post.image && (
                  <SanityImage
                    image={post.image}
                    sizes="228px"
                    className="size-57"
                  />
                )}
                {post.content && (
                  <PortableText
                    value={post.content}
                    mode="dark"
                    style="article"
                  />
                )}
              </div>

              <div className="col-span-full lg:col-span-4 lg:col-start-6">
                {post.formId && (
                  // TODO: add form here
                  <div className="min-h-225 bg-neon text-center">
                    Form here with form ID: {post.formId}
                  </div>
                )}
              </div>
            </>
          )}

          {!isGated && post.content && (
            <div className="col-span-full">
              <PortableText value={post.content} style="article" />
            </div>
          )}
        </Transition>
      </div>

      {!isGated && <ModuleBuilder blocks={post?.blocks ?? []} />}
    </>
  );
}
