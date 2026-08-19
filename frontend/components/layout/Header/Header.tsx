import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { DesktopNavbar } from "@/components/layout/Header/DesktopNavbar";
import { fetchSanityNavbar } from "@/sanity/lib/fetch";

export const Header = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const data = await fetchSanityNavbar({ perspective, stega });

  if (!data) return null;

  return (
    <header className="">
      <DesktopNavbar data={data} directionallyAware={false} />
      {/* <MobileNavbar /> */}
    </header>
  );
};
