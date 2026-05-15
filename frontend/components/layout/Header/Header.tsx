import { fetchSanityNavbar } from "@/sanity/lib/fetch";

export const Header = async () => {
  const data = await fetchSanityNavbar();

  if (!data) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* <DesktopNavbar data={data} />
      <MobileNavbar /> */}
    </header>
  );
};
