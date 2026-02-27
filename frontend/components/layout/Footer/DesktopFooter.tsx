import type { FOOTER_QUERY_RESULT } from "@/sanity.types";

// TODO PROJECT-LAUNCH: programmatically handle prefetch on SanityLink

export const DesktopFooter = ({ data }: { data: FOOTER_QUERY_RESULT }) => {
  if (!data) return null;

  return <footer className="hidden">Footer</footer>;
};
