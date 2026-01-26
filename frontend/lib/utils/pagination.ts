export const createPageUrl = ({
  route,
  pageNum,
  category,
  topic,
}: {
  route: "blog" | "case-studies" | "resources" | "events";
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
