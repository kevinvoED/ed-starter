import { fetchSanityNavbar } from "@/sanity/lib/fetch";
import { Navbar } from "./Navbar";

export default async function Header() {
  const navigationHeader = await fetchSanityNavbar();

  if (!navigationHeader) {
    return null;
  }

  return <Navbar header={navigationHeader[0]} />;
}
