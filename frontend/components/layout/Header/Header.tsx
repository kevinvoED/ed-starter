import { fetchSanityNavbar } from "@/sanity/lib/fetch";
import { Navbar } from "./Navbar";

export const Header = async () => {
  const navigationHeader = await fetchSanityNavbar();

  if (!navigationHeader) {
    return null;
  }

  return <Navbar />;
};
