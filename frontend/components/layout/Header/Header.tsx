import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { DesktopNavbar } from "@/components/layout/Header/DesktopNavbar";
import { fetchSanityNavbar } from "@/sanity/lib/fetch";

export const Header = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const data = await fetchSanityNavbar({ perspective, stega });

  if (!data) return null;

  return (
    <header>
      <DesktopNavbar data={data} directionallyAware={true} />
      {/* <MobileNavbar /> */}
    </header>
  );
};
