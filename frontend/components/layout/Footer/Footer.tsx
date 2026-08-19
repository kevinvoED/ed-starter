import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { DesktopFooter } from "@/components/layout/Footer/DesktopFooter";
import { MobileFooter } from "@/components/layout/Footer/MobileFooter";
import { fetchSanityFooter } from "@/sanity/lib/fetch";

export const Footer = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const data = await fetchSanityFooter({ perspective, stega });

  if (!data) return null;

  return (
    <div data-nav-theme="dark">
      <DesktopFooter data={data} />
      <MobileFooter data={data} />
    </div>
  );
};
