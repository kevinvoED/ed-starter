import { cn } from "cnfast";
import { SanityLink } from "@/components/primitives/Link/SanityLink";

type SkipToMainProps = {
  className?: string;
};

export const SkipToMain = ({ className }: SkipToMainProps) => {
  return (
    <SanityLink
      href="#main"
      id="nav"
      className={cn(
        "absolute top-4 left-4 z-9999 -translate-y-16 bg-white px-3 py-1.5 text-black transition focus:translate-y-0",
        className,
      )}
    >
      Skip to main content
    </SanityLink>
  );
};
