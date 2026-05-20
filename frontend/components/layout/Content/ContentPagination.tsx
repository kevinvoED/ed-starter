import type { GET_CONTENT_TYPE_INDEX_QUERY_RESULT } from "@/sanity.types";
import { Ellipsis } from "lucide-react";
import { ContentPaginationScrollHandler } from "@/components/layout/Content/ContentPaginationScrollHandler";
import { Icon } from "@/components/primitives/Icon/Icon";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { cn } from "@/lib/utils/cn";

type ContentPaginationProps = {
  pagination: NonNullable<GET_CONTENT_TYPE_INDEX_QUERY_RESULT>["pagination"];
  currentPage: number;
  createPageUrl: (pageNum: number) => string;
  className?: string;
  scrollOffset?: number;
};

const getVisiblePages = (current: number, total: number) => {
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 2) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 1) {
    return [1, "...", total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
};

export const ContentPagination = ({
  pagination,
  currentPage,
  createPageUrl,
  className,
  scrollOffset = 175,
}: ContentPaginationProps) => {
  if (pagination.totalPages <= 1) return null;

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
            href={createPageUrl(currentPage - 1)}
            hasArrow={false}
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

        {getVisiblePages(currentPage, pagination.totalPages).map(
          (pageNum, idx) =>
            pageNum === "..." ? (
              <div key={`dots-${idx}`} className="flex items-center px-2">
                <Ellipsis key={`dots-${idx}`} className="text-background" />
              </div>
            ) : (
              <SanityLink
                id="cta"
                variant={pageNum === currentPage ? "ghost" : "ghost"}
                key={pageNum}
                href={createPageUrl(pageNum as number)}
                hasArrow={false}
                scroll={false}
              >
                {pageNum}
              </SanityLink>
            ),
        )}

        {currentPage < pagination.totalPages && (
          <SanityLink
            id="cta"
            variant="ghost"
            href={createPageUrl(currentPage + 1)}
            hasArrow={false}
            scroll={false}
          >
            <Icon variant="arrow-right" strokeWidth={1} size={4} />
          </SanityLink>
        )}
      </div>
    </>
  );
};
