import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { ContentPaginationScrollHandler } from "@/components/layout/Content/ContentPaginationScrollHandler";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { cn } from "@/lib/utils/cn";

type ContentPaginationProps = {
  currentPage: number;
  totalPages: number;
  createPageUrl: (pageNum: number) => string;
  className?: string;
  scrollTargetId?: string;
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
  currentPage,
  totalPages,
  createPageUrl,
  className,
  scrollTargetId,
  scrollOffset = 175,
}: ContentPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <>
      {scrollTargetId && (
        <ContentPaginationScrollHandler
          scrollTargetId={scrollTargetId}
          scrollOffset={scrollOffset}
        />
      )}

      <div className={cn("flex gap-4 p-custom", className)}>
        {currentPage > 1 && (
          <SanityLink
            id="cta"
            variant="ghost"
            href={createPageUrl(currentPage - 1)}
            hasArrow={false}
            scroll={false}
          >
            <ChevronLeft className="size-5! stroke-1" />
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
              href={createPageUrl(pageNum as number)}
              hasArrow={false}
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
            href={createPageUrl(currentPage + 1)}
            hasArrow={false}
            scroll={false}
          >
            <ChevronRight className="size-5! stroke-1" />
          </SanityLink>
        )}
      </div>
    </>
  );
};
