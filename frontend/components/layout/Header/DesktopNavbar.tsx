"use client";

import type { NAVBAR_QUERY_RESULT } from "@/sanity.types";
import { useGSAP } from "@gsap/react";
import { toPlainText } from "@portabletext/react";
import { useRef } from "react";
import gsap from "gsap";
import { SanityImage } from "@/components/primitives/Image/SanityImage";
import { SanityLink } from "@/components/primitives/Link/SanityLink";
import { type NavTheme, useNavTheme } from "@/lib/hooks/use-nav-theme";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import cn from "cnfast";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Check if window is defined to avoid hydration errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger);
}

type DesktopNavbarProps = {
  data: NAVBAR_QUERY_RESULT;
  // Hides the navbar on scroll down and reveals it on scroll up
  directionallyAware?: boolean;
};

// Classes that invert when overlapping a dark section.
const getTriggerClassName = (theme: NavTheme) =>
  cn(
    "flex items-center justify-center gap-1 bg-transparent no-underline select-none type-mono-1240",
    "transition-colors duration-300 ease-in-out",
    "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-neutral-950",
    theme === "dark"
      ? "text-black hover:bg-platinum data-popup-open:bg-platinum"
      : "text-white hover:bg-white/10 data-popup-open:bg-white/10",
  );

function Link(props: NavigationMenu.Link.Props) {
  return (
    <NavigationMenu.Link
      render={<SanityLink id="nav" href={props.href} variant="ghost" />}
      {...props}
    />
  );
}

function CaretDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <title>Caret Down Icon</title>
      <path d="M12 6H4l4 4.5z" />
    </svg>
  );
}

export const DesktopNavbar = ({
  data,
  directionallyAware = true,
}: DesktopNavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const theme = useNavTheme(navRef);
  const triggerClassName = getTriggerClassName(theme);

  useGSAP(
    () => {
      // Early return if neither navRef or directionallyAware is set to false
      if (!navRef.current || !directionallyAware) return;

      // Directionally aware animation; navbar slides away when scrolling down and vice-versa
      const showAnim = gsap
        .from(navRef.current, {
          yPercent: -120,
          paused: true,
          duration: 0.3,
          ease: "expo.inOut",
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 ? showAnim.play() : showAnim.reverse();
        },
      });
    },
    { scope: navRef },
  );

  if (!data) return null;

  return (
    <NavigationMenu.Root
      ref={navRef}
      data-nav-theme={theme}
      className={cn(
        "fixed inset-x-0 top-2 z-50 mx-auto flex h-12 w-fit items-center justify-between gap-20 rounded-md px-2 transition-colors duration-300 ease-in-out",
        theme === "dark" ? "bg-white text-black" : "bg-debug-blue text-white",
      )}
    >
      <SanityLink id="nav" href="/" variant="ghost">
        <SanityImage
          image={data.logo}
          sizes="40px"
          className="size-8 rounded-md"
        />
      </SanityLink>

      <NavigationMenu.List className="relative flex gap-5">
        {data?.mainLinks?.map((item) => {
          if (item._type === "standaloneLink") {
            return (
              <NavigationMenu.Item key={item._key}>
                <Link
                  className={triggerClassName}
                  href={item.links[0].href || ""}
                >
                  {item.links[0].label}
                </Link>
              </NavigationMenu.Item>
            );
          }

          if (item._type === "group") {
            return (
              <NavigationMenu.Item key={item._key}>
                <NavigationMenu.Trigger className={triggerClassName}>
                  <Link className={triggerClassName}>
                    {toPlainText(item.title)}
                  </Link>
                  <NavigationMenu.Icon className="transition-transform duration-200 ease-[ease] data-popup-open:rotate-180">
                    <CaretDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content
                  className={cn(
                    "h-full w-[calc(100vw-40px)] p-2 min-[500px]:w-max min-[500px]:max-w-100",
                    "transition-[opacity,transform,translate] duration-(--duration) ease-(--easing) data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%] data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-ending-style:opacity-0 data-starting-style:opacity-0",
                  )}
                >
                  {item?.group?.map((groupItem) => (
                    <div
                      key={groupItem._key}
                      className="mb-4 flex flex-col gap-2.5 last:mb-0"
                    >
                      {groupItem.title?.map((titleItem) => (
                        <p key={titleItem._key}>{toPlainText(titleItem)}</p>
                      ))}

                      <ul className="m-0 flex list-none flex-col gap-1 p-0 text-black max-[500px]:grid-cols-1">
                        {groupItem.links?.map((link) => (
                          <li key={link._key}>
                            <Link
                              href={link.href || ""}
                              className="relative block size-full border-0 bg-transparent p-2 text-left text-inherit no-underline hover:bg-neutral-100 hover:underline focus-visible:outline-2 focus-visible:outline-neutral-950 focus-visible:-outline-offset-1 data-popup-open:bg-neutral-100"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return null;
        })}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: "none" }}
          className={cn(
            "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) before:absolute before:content-['']",
            "data-instant:transition-none data-[side=bottom]:before:-top-2.5 data-[side=left]:before:top-0 data-[side=right]:before:top-0 data-[side=bottom]:before:right-0 data-[side=left]:before:-right-2.5 data-[side=top]:before:right-0 data-[side=left]:before:bottom-0 data-[side=right]:before:bottom-0 data-[side=top]:before:-bottom-2.5 data-[side=bottom]:before:left-0 data-[side=right]:before:-left-2.5 data-[side=top]:before:left-0 data-[side=bottom]:before:h-2.5 data-[side=top]:before:h-2.5 data-[side=left]:before:w-2.5 data-[side=right]:before:w-2.5",
          )}
          style={{
            ["--duration" as string]: "0.35s",
            ["--easing" as string]: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <NavigationMenu.Popup
            className={cn(
              "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin)",
              "border border-neutral-950 bg-white text-black shadow-[0.25rem_0.25rem_0] shadow-black/12 outline-none",
              "transition-[opacity,transform,width,height,scale] duration-(--duration) ease-(--easing) data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 data-ending-style:ease-[ease]",
            )}
          >
            <NavigationMenu.Arrow
              className={cn(
                "relative block h-1.5 w-3 overflow-clip",
                "transition-[left,right] duration-(--duration) ease-(--easing) before:absolute before:bottom-0 before:left-1/2 before:block before:h-[calc(6px*sqrt(2))] before:w-[calc(6px*sqrt(2))] before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45 before:border before:border-neutral-950 before:bg-white before:content-[''] data-[side=bottom]:-top-1.5 data-[side=left]:-right-2.25 data-[side=top]:-bottom-1.5 data-[side=right]:-left-2.25 data-[side=left]:rotate-90 data-[side=right]:-rotate-90 data-[side=top]:rotate-180",
              )}
            />
            <NavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
};
