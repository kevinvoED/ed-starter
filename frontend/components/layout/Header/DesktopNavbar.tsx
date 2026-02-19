import { SanityLink } from "@/components/primitives/Link/SanityLink";

const navigationItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/ed/button",
    label: "Button",
  },
  {
    href: "/ed/accordion",
    label: "Accordion",
  },
  {
    href: "/ed/tabs",
    label: "Tabs",
  },
];

export const DesktopNavbar = () => {
  return (
    <nav className="flex flex-wrap gap-4 bg-white p-custom py-3 text-black">
      {navigationItems.map(({ href, label }) => (
        <SanityLink
          key={href}
          href={href}
          id="nav"
          variant="ghost"
          width="fit"
          hasArrow={false}
          className="underline-offset-2 hover:underline"
        >
          {label}
        </SanityLink>
      ))}
    </nav>
  );
};
