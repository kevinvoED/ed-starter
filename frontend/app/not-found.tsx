import type { Metadata } from "next";
import { SanityLink } from "@/components/primitives/Link/SanityLink";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFoundPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <div className="container text-center">
        <h1 className="type-heading-3230">Missing page</h1>
        <SanityLink
          id="nav"
          href="/"
          variant="primary"
          width="fit"
          hasArrow={false}
        >
          Go home
        </SanityLink>
      </div>
    </div>
  );
}
