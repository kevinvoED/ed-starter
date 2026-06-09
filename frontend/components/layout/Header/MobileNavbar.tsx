import { SanityLink } from "@/components/primitives/Link/SanityLink";

// TODO PROJECT-LAUNCH: programmatically handle prefetch on SanityLink

export const MobileNavbar = () => {
  return (
    <nav className="hidden">
      <SanityLink href="/" id="nav" variant="ghost" width="fit">
        Home
      </SanityLink>

      <SanityLink href="/ed/button" id="nav" variant="ghost" width="fit">
        Button
      </SanityLink>

      <SanityLink href="/ed/accordion" id="nav" variant="ghost" width="fit">
        Accordion
      </SanityLink>
    </nav>
  );
};
