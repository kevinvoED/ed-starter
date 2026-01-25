import type { FOOTER_QUERY_RESULT } from "@/sanity.types";

export const DesktopFooter = ({ data }: { data: FOOTER_QUERY_RESULT }) => {
  if (!data) {
    return null;
  }

  return <footer className="hidden lg:block">Footer</footer>;
};
