import type {
  BLOG_QUERYResult,
  CASE_STUDIES_QUERYResult,
  EVENTS_QUERYResult,
  RESOURCE_QUERYResult,
} from "@/sanity.types";
import { toPlainText } from "@portabletext/react";
import Image from "next/image";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { SanityImage } from "@/components/Media/SanityImage";
import { formatDate } from "@/lib/formatDate";
import { cn, getHref } from "@/lib/utils";

type PostCardProps = NonNullable<
  NonNullable<
    | BLOG_QUERYResult
    | CASE_STUDIES_QUERYResult
    | RESOURCE_QUERYResult
    | EVENTS_QUERYResult
  >["posts"][number]
> & {
  className?: string;
  variant: "small" | "large" | "full";
  route: "blog" | "case-studies" | "resources" | "events";
};

export const PostCard = ({
  title,
  categories,
  topics,
  variant,
  image,
  publishedDate,
  _createdAt,
  className,
  link,
  slug,
  route,
}: PostCardProps) => {
  return (
    <article
      className={cn(
        "group/blog-post bg-white p-6",
        variant === "small" &&
          "col-span-full flex h-90 flex-col justify-between lg:col-span-3 lg:h-115",
        variant === "large" &&
          "col-span-full flex h-90 flex-col justify-between lg:col-span-5 lg:h-115",
        variant === "full" &&
          "col-span-full grid h-90 grid-cols-[1fr_60px] gap-10",
        className,
      )}
    >
      <div className="col-span-1">
        <div className="flex flex-col gap-6">
          <div className="flex min-h-9 justify-between">
            {(categories && categories.length > 0 ? categories : topics)
              ?.slice(0, 1)
              .map((item) => (
                <Eyebrow key={item._id} variant="neon-sm" className="max-h-fit">
                  {item.title}
                </Eyebrow>
              ))}

            {publishedDate ? (
              <span className="type-mono-1040 col-span-full text-silver">
                {formatDate(publishedDate)}
              </span>
            ) : (
              <span className="type-mono-1040 col-span-full text-silver">
                {formatDate(_createdAt)}
              </span>
            )}
          </div>
          {title && (
            <h3 className="type-heading-2430 line-clamp-5 text-balance">
              {toPlainText(title)}
            </h3>
          )}
        </div>
      </div>

      {link ? (
        <Button link={link} variant="card" aria-label={title} />
      ) : (
        <Button
          href={`${getHref(route)}/${slug?.current}`}
          variant="card"
          aria-label={title}
          hasArrow={false}
          className="col-start-2 row-start-1"
        />
      )}

      <div className="col-start-1 row-start-2 flex justify-between">
        {image && variant !== "full" && (
          <div className="relative size-24.5 lg:size-31">
            <SanityImage
              image={image}
              sizes="125px"
              className="h-full w-full"
            />
            {categories?.[0].image && (
              <SanityImage
                image={categories[0].image}
                sizes="40px"
                className="absolute bottom-0 left-0 h-10 w-10"
              />
            )}
          </div>
        )}

        <Button
          variant="secondary-black"
          href={`${getHref(route)}/${slug?.current}`}
          className="!w-16 !min-w-16 row-start-3 mt-2 max-h-fit self-end"
          hasArrow={true}
          disabled
        >
          {link?.title ?? "Read"}
        </Button>
      </div>

      <div
        className={`col-start-2 row-span-2 row-start-1 h-full ${variant !== "full" && "hidden"}`}
      >
        <div className="relative h-1/2 w-full lg:h-full">
          <Image
            src="/images/pattern-post-card-full.png"
            alt="Pattern"
            fill
            sizes="125px"
          />
        </div>
      </div>
    </article>
  );
};
