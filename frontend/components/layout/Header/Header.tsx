import { fetchSanityNavbar } from "@/sanity/lib/fetch";
import { DesktopNavbar } from "@/components/layout/Header/DesktopNavbar";
import { MobileNavbar } from "@/components/layout/Header/MobileNavbar";

export const Header = async () => {
  const data = await fetchSanityNavbar();

  if (!data) {
    return null;
  }

  return (
    <>
      <DesktopNavbar data={data} />
      <MobileNavbar />
    </>
  );
};
