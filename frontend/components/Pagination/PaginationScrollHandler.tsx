"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface PaginationScrollHandler {
  scrollTargetId: string;
  scrollOffset: number;
}

export const PaginationScrollHandler = ({
  scrollTargetId,
  scrollOffset,
}: PaginationScrollHandler) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams.get("page");

    // Only scroll if there's a page parameter (meaning we navigated via pagination)
    if (currentPage && parseInt(currentPage) > 1) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        const targetElement = document.getElementById(scrollTargetId);
        if (targetElement) {
          const elementTop = targetElement.offsetTop;
          const offsetPosition = elementTop - scrollOffset;

          window.scrollTo({
            top: offsetPosition,
          });
        }
      }, 100);
    }
  }, [searchParams, scrollTargetId, scrollOffset]);

  return null;
};
