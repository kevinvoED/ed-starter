import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { fetchSanityNavbar } from "@/sanity/lib/fetch";
import { DesktopNavbar } from "@/components/layout/Header/DesktopNavbar";

export const Header = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";

  const data = await fetchSanityNavbar({ perspective, stega });

  if (!data) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <DesktopNavbar data={data} />
      {/* <MobileNavbar /> */}
    </header>
  );
};
