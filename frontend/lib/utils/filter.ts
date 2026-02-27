import { kebabCase } from "es-toolkit";

type FilterItem = {
  _id: string;
  slug: { current: string } | null;
  count?: number;
};

/*
 * Returns the count for a filter item if it matches the current filter value,
 * otherwise returns 0. Handles "none" and undefined filter values as matching all items.
 */
export function getFilterItemCount<T extends FilterItem>(
  currentFilter: string | undefined,
  item: T,
  items: readonly T[],
): number {
  const isMatch =
    currentFilter === "none" ||
    !currentFilter ||
    kebabCase(currentFilter) === kebabCase(item.slug?.current ?? "");

  if (!isMatch) {
    return 0;
  }

  return items.find((c) => c._id === item._id)?.count ?? 0;
}
