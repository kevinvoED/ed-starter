import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Button } from "@/components/primitives/Button/Button";
import { PaginationScrollHandler } from "@/components/primitives/Pagination/PaginationScrollHandler";
import { cn } from "@/lib/utils/cn";

type PaginationProps = {
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

export const Pagination = ({
  currentPage,
  totalPages,
  createPageUrl,
  className,
  scrollTargetId,
  scrollOffset = 175,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <>
      {scrollTargetId && (
        <PaginationScrollHandler
          scrollTargetId={scrollTargetId}
          scrollOffset={scrollOffset}
        />
      )}

      <div className={cn("flex justify-center gap-4", className)}>
        {currentPage > 1 && (
          <Button
            variant="ghost"
            href={createPageUrl(currentPage - 1)}
            hasArrow={false}
            scroll={false}
          >
            <ChevronLeft className="!size-12 stroke-1" />
          </Button>
        )}

        {getVisiblePages(currentPage, totalPages).map((pageNum, idx) =>
          pageNum === "..." ? (
            <div key={`dots-${idx}`} className="flex items-center px-2">
              <Ellipsis key={`dots-${idx}`} className="text-background" />
            </div>
          ) : (
            <Button
              variant={pageNum === currentPage ? "ghost" : "ghost"}
              key={pageNum}
              href={createPageUrl(pageNum as number)}
              hasArrow={false}
              scroll={false}
            >
              {pageNum}
            </Button>
          ),
        )}

        {currentPage < totalPages && (
          <Button
            variant="ghost"
            href={createPageUrl(currentPage + 1)}
            hasArrow={false}
            scroll={false}
          >
            <ChevronRight className="!size-12 stroke-1" />
          </Button>
        )}
      </div>
    </>
  );
};
