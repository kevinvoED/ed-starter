"use client";

import { usePathname } from "next/navigation";
import { TextMask } from "@/components/animations/TextMask";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { cn } from "cnfast";

// ! DELETE AFTER PROJECT INITIALIZATION

const MAIN_LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Case Studies",
    href: "/case-studies",
  },
];

export const Starter = () => {
  const pathname = usePathname();

  return (
    <section className="bg-debug-blue text-white">
      <div className="type-mono-1240 max-w-fit p-custom py-4 uppercase tracking-tighter!">
        <TextMask>ED {"//"} Starter</TextMask>

        <div className="flex flex-col pl-5">
          {MAIN_LINKS.map((link, index) => (
            <TextMask key={link.label} delay={0.15 * index}>
              <SanityLink
                href={link.href}
                id="cta"
                variant="ghost"
                scroll={false}
                className={cn(
                  "hover:underline",
                  pathname === link.href ? "pl-2 font-bold" : "",
                )}
              >
                {link.label}
              </SanityLink>
            </TextMask>
          ))}
        </div>
      </div>
    </section>
  );
};
