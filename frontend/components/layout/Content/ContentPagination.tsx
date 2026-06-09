"use client";

import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";
import { parseAsString, useQueryStates } from "nuqs";
import { ContentPaginationScrollHandler } from "@/components/layout/Content/ContentPaginationScrollHandler";
import { Icon } from "@/components/primitives/Icon/Icon";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { cn } from "@/lib/utils/cn";

type ContentPaginationProps = {
  pagination: NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["pagination"];
  currentPage: number;
  className?: string;
  scrollOffset?: number;
};

/*
 * This component handles the pagination logic for Content Listing pages.
 * The related GROQ query that returns pagination data can be found in GET_CONTENT_TYPE_INDEX_QUERY_RESULT.
 * The `limit` parameter is found in `fetchContentTypeIndexPageData` and controls the number of posts per page.
 */
export const ContentPagination = ({
  pagination,
  currentPage,
  className,
  scrollOffset = 175,
}: ContentPaginationProps) => {
  // GROQ doesn't have a ceil function so we need to convert it client-side
  const totalPages = Math.ceil(pagination?.totalPages ?? 1);

  // Don't render this component if there is only one page
  if (totalPages <= 1) return null;

  const pathname = usePathname();

  const [{ category, topic }] = useQueryStates({
    category: parseAsString,
    topic: parseAsString,
  });

  /*
   * Utility function to build a page URL with optional query parameters
   * Example Return: /blog?page=2&category=technology
   */
  function buildPageUrl(pageNum: number) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (topic) params.set("topic", topic);
    if (pageNum > 1) params.set("page", pageNum.toString());
    return `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  }

  return (
    <>
      {pagination.scrollTargetId && (
        <ContentPaginationScrollHandler
          scrollTargetId={pagination.scrollTargetId}
          scrollOffset={scrollOffset}
        />
      )}

      <div
        className={cn(
          "col-span-full flex items-center gap-4 self-start pb-30",
          className,
        )}
      >
        {currentPage > 1 && (
          <SanityLink
            id="cta"
            variant="ghost"
            href={buildPageUrl(currentPage - 1)}
            scroll={false}
          >
            <Icon
              variant="arrow-right"
              strokeWidth={1}
              size={4}
              className="rotate-180"
            />
          </SanityLink>
        )}

        {getVisiblePages(currentPage, totalPages).map((pageNum, idx) =>
          pageNum === "..." ? (
            <div key={`dots-${idx}`} className="flex items-center px-2">
              <Ellipsis key={`dots-${idx}`} className="text-background" />
            </div>
          ) : (
            <SanityLink
              id="cta"
              variant={pageNum === currentPage ? "ghost" : "ghost"}
              key={pageNum}
              href={buildPageUrl(pageNum as number)}
              scroll={false}
            >
              {pageNum}
            </SanityLink>
          ),
        )}

        {currentPage < totalPages && (
          <SanityLink
            id="cta"
            variant="ghost"
            href={buildPageUrl(currentPage + 1)}
            scroll={false}
          >
            <Icon variant="arrow-right" strokeWidth={1} size={4} />
          </SanityLink>
        )}
      </div>
    </>
  );
};

// Renders an ellipsis if there are more than 6 pages
const getVisiblePages = (current: number, total: number) => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 2) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 1) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
};
