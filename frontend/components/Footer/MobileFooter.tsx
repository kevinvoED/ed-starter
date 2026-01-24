import type { FOOTER_QUERY_RESULT } from "@/sanity.types";

export const MobileFooter = ({ data }: { data: FOOTER_QUERY_RESULT }) => {
  if (!data) {
    return null;
  }

  return <footer>Footer</footer>;
};
