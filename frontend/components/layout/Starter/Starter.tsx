"use client";

import { usePathname } from "next/navigation";
import { useQueryState } from "nuqs";
import { TextMask } from "@/components/animations/TextMask";
import { StarterAccordion } from "@/components/layout/Starter/StarterAccordion";
import { StarterButton } from "@/components/layout/Starter/StarterButton";
import { StarterMarquee } from "@/components/layout/Starter/StarterMarquee";
import { StarterSelect } from "@/components/layout/Starter/StarterSelect";
import { StarterSheet } from "@/components/layout/Starter/StarterSheet";
import { StarterTable } from "@/components/layout/Starter/StarterTable";
import { StarterTabs } from "@/components/layout/Starter/StarterTabs";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { cn } from "@/lib/utils/cn";

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

const EXAMPLE_LINKS = [
  {
    label: "Accordion",
    href: "/demo?example=accordion",
  },
  {
    label: "Button",
    href: "/demo?example=button",
  },
  {
    label: "Marquee",
    href: "/demo?example=marquee",
  },
  {
    label: "Select",
    href: "/demo?example=select",
  },
  {
    label: "Sheet",
    href: "/demo?example=sheet",
  },
  {
    label: "Table",
    href: "/demo?example=table",
  },
  {
    label: "Tabs",
    href: "/demo?example=tabs",
  },
];

export const Starter = () => {
  const pathname = usePathname();
  const [example] = useQueryState("example");
  const isExampleActive = (value: string) => example === value;

  const getActiveLabel = () => {
    if (pathname === "/") return "ED Starter";
    if (pathname === "/blog") return "Blog";
    if (pathname === "/case-studies") return "Case Studies";
    if (example) return example.charAt(0).toUpperCase() + example.slice(1);
    return null;
  };

  return (
    <section className="grid-custom relative min-h-screen grid-rows-[65%_1fr] gap-20 overflow-hidden bg-debug-blue text-white">
      <div className="absolute top-5 left-5">
        <div className="type-mono-1240 uppercase tracking-tighter!">
          <TextMask>ED {"//"} Starter</TextMask>

          <div className="flex flex-col pl-5">
            {MAIN_LINKS.map((link, index) => (
              <TextMask key={link.label} delay={0.15 * index}>
                <SanityLink
                  href={link.href}
                  id="cta"
                  variant="ghost"
                  hasArrow={false}
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
            <TextMask delay={0.15 * MAIN_LINKS.length}>Demo</TextMask>
          </div>

          <div className="flex flex-col pl-8">
            {EXAMPLE_LINKS.map((link, index) => (
              <TextMask
                key={link.href}
                delay={0.15 * (MAIN_LINKS.length + index)}
              >
                <SanityLink
                  href={link.href}
                  id="cta"
                  variant="ghost"
                  hasArrow={false}
                  scroll={false}
                  className={cn(
                    "hover:underline",
                    example?.includes(link.label.toLowerCase())
                      ? "pl-2 font-bold"
                      : "",
                  )}
                >
                  {link.label}
                </SanityLink>
              </TextMask>
            ))}
          </div>
        </div>
      </div>
      <div className="col-spanfull my-5 p-custom lg:col-span-8 lg:col-start-5">
        {isExampleActive("accordion") && <StarterAccordion />}
        {isExampleActive("button") && <StarterButton />}
        {isExampleActive("marquee") && <StarterMarquee />}
        {isExampleActive("select") && <StarterSelect />}
        {isExampleActive("sheet") && <StarterSheet />}
        {isExampleActive("table") && <StarterTable />}
        {isExampleActive("tabs") && <StarterTabs />}
      </div>
      <div className="col-span-full row-start-2 grid">
        <div className="place-self-end">
          <h1
            key={pathname}
            className="ftype type-heading-9640 to-type-heading-20050 uppercase tracking-tighter! [text-box:trim-both_cap_alphabetic]"
          >
            {getActiveLabel()}
          </h1>
        </div>
      </div>
    </section>
  );
};
