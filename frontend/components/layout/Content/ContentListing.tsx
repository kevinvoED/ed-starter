import type { ContentIndexVariant } from "@/lib/utils/types";
import { cn } from "cnfast";
import { ContentPost } from "./ContentPost";

type ContentListingProps = {
  scrollTargetId: ContentIndexVariant["pagination"]["scrollTargetId"];
  posts: ContentIndexVariant["posts"];
  className?: string;
};

export const ContentListing = async ({
  scrollTargetId,
  posts,
  className,
}: ContentListingProps) => {
  if (!posts || posts.length === 0) return null;

  return (
    <ul
      id={scrollTargetId}
      className={cn("grid-custom col-span-full xl:col-span-10", className)}
    >
      {posts.map((post, index) => (
        <ContentPost key={post._id} post={post} index={index} />
      ))}
    </ul>
  );
};
