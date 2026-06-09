import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { toPlainText } from "next-sanity";
import { Transition } from "@/components/animations/Transition";
import { Eyebrow } from "@/components/primitives/Eyebrow/Eyebrow";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { PortableText } from "@/components/primitives/PortableText/PortableText";
import { cn } from "@/lib/utils/cn";

type ContentListingProps = {
  scrollTargetId: NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["pagination"]["scrollTargetId"];
  posts: NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["posts"];
  className?: string;
};

export const ContentListing = ({
  scrollTargetId,
  posts,
  className,
}: ContentListingProps) => {
  // If no posts, return a properly designed EmptyState here instead of null
  if (!posts || posts.length === 0) return null;

  return (
    <ul
      id={scrollTargetId}
      className={cn("grid-custom col-span-full xl:col-span-10", className)}
    >
      {posts?.map((post, _index) => (
        <li
          key={post._id}
          className="col-span-full rounded-lg bg-white ring ring-black/5 md:col-span-2 lg:col-span-6 xl:col-span-4"
        >
          <Transition className="h-full">
            <SanityLink
              id="cta"
              href={post.href}
              variant="ghost"
              card
              width="fit"
              className="h-full"
            >
              <div className="flex h-full flex-col justify-between">
                {post.image && (
                  <SanityImage
                    image={post.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="h-60 overflow-hidden rounded-tl-lg rounded-tr-lg border-black/10 border-b"
                  />
                )}

                <div className="flex flex-col gap-4 px-2.5 py-6">
                  <div className="flex flex-wrap gap-1">
                    {post._createdAt && (
                      <Eyebrow variant="filter">
                        {new Date(post._createdAt).toLocaleDateString()}
                      </Eyebrow>
                    )}

                    {post.category?.map(({ _id, title }) => (
                      <Eyebrow key={_id} variant="filter">
                        {toPlainText(title)}
                      </Eyebrow>
                    ))}

                    {post.contentTopic?.map(({ _id, title }) => (
                      <Eyebrow key={_id} variant="filter">
                        {toPlainText(title)}
                      </Eyebrow>
                    ))}
                  </div>

                  <PortableText
                    slot="h3"
                    value={post.title}
                    className="type-body-1650"
                  />
                </div>
              </div>
            </SanityLink>
          </Transition>
        </li>

        // </li>
      ))}
    </ul>
  );
};
