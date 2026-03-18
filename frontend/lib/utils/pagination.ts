/*
 * Utility function to create a page URL with optional query parameters
 *
 * Usage Example:
 *  createPageUrl({ route: "blog", pageNum: 2, category: "technology" })
 *  // Returns: /blog?page=2&category=technology
 */

export const createPageUrl = ({
  route,
  pageNum,
  category,
  topic,
}: {
  route: "blog" | "case-studies";
  pageNum: number;
  category?: string;
  topic?: string;
}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (topic) params.set("topic", topic);
  if (pageNum > 1) params.set("page", pageNum.toString());
  return `/${route}${params.toString() ? `?${params.toString()}` : ""}`;
};
