import { fetchSanityNavbar } from "@/sanity/lib/fetch";
import { DesktopNavbar } from "@/components/layout/Header/DesktopNavbar";
import { MobileNavbar } from "@/components/layout/Header/MobileNavbar";

export const Header = async () => {
  const navigationHeader = await fetchSanityNavbar();

  if (!navigationHeader) {
    return null;
  }

  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
};
