import type { FOOTER_QUERYResult } from "@/sanity.types";

export const DesktopFooter = ({ data }: { data: FOOTER_QUERYResult }) => {
  if (!data) {
    return null;
  }

  return <footer>Footer</footer>;
};
