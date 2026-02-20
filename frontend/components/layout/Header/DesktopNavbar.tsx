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
    href: "/ed/marquee",
    label: "Marquee",
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

const contentNavItems = [
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/case-studies",
    label: "Case Studies",
  },
];

export const DesktopNavbar = () => {
  return (
    <nav className="flex flex-wrap gap-15 bg-white p-custom py-3 text-black">
      <div className="flex flex-wrap gap-4">
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
      </div>

      <div className="flex flex-wrap gap-4">
        {contentNavItems.map(({ href, label }) => (
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
      </div>
    </nav>
  );
};
