import { fetchSanityFooter } from "@/sanity/lib/fetch";
import { DesktopFooter } from "@/components/layout/Footer/DesktopFooter";
import { MobileFooter } from "@/components/layout/Footer/MobileFooter";

export const Footer = async () => {
  const data = await fetchSanityFooter();

  if (!data) {
    return null;
  }

  return (
    <div data-nav-theme="dark">
      <DesktopFooter data={data} />
      <MobileFooter data={data} />
    </div>
  );
};
