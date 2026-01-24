import type {
  BLOG_QUERYResult,
  CASE_STUDIES_QUERYResult,
  EVENTS_QUERYResult,
} from "@/sanity.types";
import { toPlainText } from "@portabletext/react";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { SanityImage } from "@/components/Media/SanityImage";
import { formatDate } from "@/lib/formatDate";
import { cn } from "@/lib/utils";

type PostFeaturedCardProps = NonNullable<
  NonNullable<
    BLOG_QUERYResult | CASE_STUDIES_QUERYResult | EVENTS_QUERYResult
  >["featuredPost"]
> & {
  className?: string;
  route: "blog" | "case-studies" | "events";
};

export const PostFeaturedCard = ({
  title,
  categories,
  topics,
  publishedDate,
  image,
  slug,
  link,
  className,
  _createdAt,
  route,
}: PostFeaturedCardProps) => {
  return (
    <article
      className={cn(
        "group/featured-blog-post relative space-y-12 bg-white p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        {(categories && categories.length > 0 ? categories : topics)
          ?.slice(0, 1)
          .map((item) => (
            <Eyebrow key={item._id} variant="neon-sm" className="max-h-fit">
              {item.title}
            </Eyebrow>
          ))}

        {image && (
          <SanityImage
            image={image}
            sizes="(max-width: 1024px) 124px, 200px"
            className="size-31 lg:size-50"
          />
        )}
      </div>

      <div className="grid grid-cols-10 gap-x-5 gap-y-6">
        {publishedDate ? (
          <span className="type-mono-1040 col-span-full text-silver">
            {formatDate(publishedDate)}
          </span>
        ) : (
          <span className="type-mono-1040 col-span-full text-silver">
            {formatDate(_createdAt)}
          </span>
        )}

        {title && (
          <h2 className="type-heading-2430 lg:type-heading-3230 col-span-full line-clamp-5 text-balance md:col-span-5">
            {toPlainText(title)}
          </h2>
        )}

        <Button
          variant="secondary-black"
          className="!w-16 !min-w-16 row-start-3 mt-2"
          disabled
        >
          {link?.title ?? "Read"}
        </Button>

        {link ? (
          <Button link={link} variant="card" aria-label={title} />
        ) : (
          <Button
            href={`/${route}/${slug?.current}`}
            variant="card"
            aria-label={title}
            hasArrow={false}
          />
        )}
      </div>
    </article>
  );
};
