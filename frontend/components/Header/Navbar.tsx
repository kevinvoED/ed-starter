"use client";
import type { ReactNode } from "react";
import type { NAVBAR_QUERYResult } from "@/sanity.types";
import { toPlainText } from "@portabletext/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  ButtonVariants,
  type ResolvedLinkType,
} from "@/components/Button/Button";
import { Dot } from "@/components/Dot/Dot";
import { FooterLink } from "@/components/Footer/FooterLink";
import { ClickTextScramble } from "@/components/GSAP/ClickTextScramble";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { SanityImage } from "@/components/Media/SanityImage";
import { PortableText } from "@/components/PortableText/PortableText";
import { useNavTheme } from "@/lib/useNavTheme";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";

const MOBILE_BREAKPOINT = 1280;

// Extract types for cleaner code
type NavigationHeader = NAVBAR_QUERYResult[0];
type NavigationLink = NonNullable<NavigationHeader["links"]>[number];
type GroupItem = NonNullable<
  Extract<NavigationLink, { _type: "group" }>["group"]
>[number];
type LinkGroupItem = Extract<GroupItem, { _type: "link-group" }>;

// Wrapper components with proper typing for Radix UI NavigationMenu
const NavigationMenuList = ({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List> &
  React.HTMLAttributes<HTMLUListElement> & {
    children?: ReactNode;
  }) => {
  return (
    <NavigationMenuPrimitive.List
      {...(props as React.ComponentProps<typeof NavigationMenuPrimitive.List>)}
    >
      {children}
    </NavigationMenuPrimitive.List>
  );
};

const NavigationMenuItem = ({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item> &
  React.HTMLAttributes<HTMLLIElement> & {
    children?: ReactNode;
  }) => {
  return (
    <NavigationMenuPrimitive.Item
      {...(props as React.ComponentProps<typeof NavigationMenuPrimitive.Item>)}
    >
      {children}
    </NavigationMenuPrimitive.Item>
  );
};

const NavigationMenuTrigger = ({
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger> &
  React.HTMLAttributes<HTMLButtonElement> & {
    children?: ReactNode;
  }) => {
  return (
    <NavigationMenuPrimitive.Trigger
      {...(props as React.ComponentProps<
        typeof NavigationMenuPrimitive.Trigger
      >)}
    >
      {children}
    </NavigationMenuPrimitive.Trigger>
  );
};

type NavigationMenuRootProps = React.ComponentProps<
  typeof NavigationMenuPrimitive.Root
> &
  React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
  };

export const Navbar = ({ header }: { header: NAVBAR_QUERYResult[0] }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [desktopNavValue, setDesktopNavValue] = useState<string>("");
  const navTheme = useNavTheme();
  const isLightTheme = navTheme === "light";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  const closeNav = () => {
    setOpen(false);
  };

  const closeDesktopNav = () => {
    setDesktopNavValue("");
  };

  return (
    <section>
      {/* Desktop navigation blur overlay */}
      {desktopNavValue && (
        <div
          className={cn(
            "fade-in-0 fixed inset-0 z-50 hidden animate-in bg-black/54 backdrop-blur-sm duration-200 xl:block",
            isLightTheme ? "bg-white/54" : "bg-black/54",
          )}
        />
      )}
      <div className="pointer-events-auto fixed top-0 z-999 w-full bg-transparent p-2">
        {/* {banner && banner.length > 0 && !open && (
          <Banner
            data={banner[0]}
            component={BannerComponent}
            bannerId="banner1"
          />
        )} */}
        <nav
          className={cn(
            "flex w-full items-center p-custom py-3.25 backdrop-blur-sm transition-all duration-300 xl:py-4",
            isLightTheme ? "bg-white/90 text-black" : "bg-black/90 text-white",
          )}
        >
          {header.logo && (
            <Button
              href="/"
              variant="icon"
              hasArrow={false}
              className="overflow-visible rounded-none"
            >
              <Transition animation="fadeInDown" delay={1}>
                <SanityImage
                  image={header.logo}
                  priority
                  sizes="103px"
                  className={cn(
                    "h-7.5 w-full max-w-26 transition-all duration-300",
                    isLightTheme && "invert",
                  )}
                />
              </Transition>
            </Button>
          )}
          <div className="flex w-full items-center justify-between">
            <NavigationMenuWithoutViewport
              className="ml-36 flex"
              value={desktopNavValue}
              onValueChange={setDesktopNavValue}
            >
              <NavigationMenuList
                data-slot="navigation-menu-list"
                className="group relative hidden flex-1 list-none items-center justify-center gap-4 xl:flex"
              >
                {header.links?.map((item, index) =>
                  renderDesktopMenuItem(
                    item,
                    index,
                    closeDesktopNav,
                    isLightTheme,
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenuWithoutViewport>
            <div className="hidden items-center gap-3 xl:ml-0 xl:flex">
              {header.ctaLinks?.map((link, index) => {
                // Determine variant based on theme and index
                let variant: Parameters<typeof Button>[0]["variant"];
                if (index === 0) {
                  variant = "ghost";
                } else if (index === 1) {
                  variant = isLightTheme ? "tertiary-black" : "tertiary-neon";
                } else {
                  variant = "primary-neon-black-small";
                }

                return (
                  <Button
                    key={link._key}
                    link={link}
                    hasArrow={false}
                    variant={variant}
                    className={cn(
                      "uppercase transition-colors duration-300",
                      index === 0 && isLightTheme && "text-black",
                      index === 2 && "ml-12",
                    )}
                  >
                    {link.title}
                  </Button>
                );
              })}
              <div className="h-6 xl:hidden">
                <Button
                  variant="ghost"
                  onClick={handleMobileMenu}
                  className="h-6 p-0 hover:bg-transparent"
                  aria-label="Toggle mobile menu"
                >
                  <div className="relative size-6">
                    <span
                      className={cn(
                        "absolute top-0.5 left-0 h-0.5 w-5.5 bg-foreground transition-all duration-300",
                        open ? "top-2.5 rotate-45" : "top-0.5",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-2.5 left-0 h-0.5 w-5.5 bg-foreground transition-all duration-300",
                        open ? "opacity-0" : "opacity-100",
                      )}
                    />
                    <span
                      className={cn(
                        "absolute top-4.5 left-0 h-0.5 w-5.5 bg-foreground transition-all duration-300",
                        open ? "top-2.5 -rotate-45" : "top-4.5",
                      )}
                    />
                  </div>
                </Button>
              </div>
            </div>
            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={handleMobileMenu}
              aria-label="Toggle mobile menu"
              className={cn(
                ButtonVariants({
                  variant: isLightTheme ? "tertiary-black" : "tertiary-white",
                }),
                "xl:hidden",
              )}
            >
              [
              <span className="px-1">
                <ClickTextScramble>{open ? "Close" : "Menu"}</ClickTextScramble>
              </span>{" "}
              ]
            </button>
          </div>
        </nav>
      </div>
      <MobileNavigationMenu
        open={open}
        header={header}
        closeNav={closeNav}
        isLightTheme={isLightTheme}
      />
    </section>
  );
};

const renderDesktopMenuItem = (
  item: NavigationLink,
  index: number,
  closeDesktopNav: () => void,
  isLightTheme = false,
) => {
  // Simple link case
  if (item._type === "link") {
    return (
      <NavigationMenuItem
        data-slot="navigation-menu-item"
        className="relative"
        key={item._key}
        value={`${index}`}
      >
        <Button
          href={item.href || "#"}
          variant="ghost"
          className={cn(
            "px-1 uppercase transition-colors duration-300",
            isLightTheme
              ? "text-black hover:bg-black hover:text-white"
              : "text-white hover:bg-neon hover:text-black",
          )}
          hasArrow={false}
        >
          {item.title}
        </Button>
      </NavigationMenuItem>
    );
  }

  // Group case with dropdown
  if (item._type === "group" && item.group) {
    return (
      <NavigationMenuItem
        data-slot="navigation-menu-item"
        className="relative"
        key={item._key}
        value={`${index}`}
      >
        <NavigationMenuTrigger
          data-slot="navigation-menu-trigger"
          className={cn(
            ButtonVariants({ variant: "ghost" }),
            "group px-1 uppercase transition-colors duration-300",
            isLightTheme
              ? "text-black hover:bg-black hover:text-white"
              : "text-white hover:bg-neon hover:text-black",
            // Invisible bridge to prevent menu closing when hovering from trigger to content
            "before:absolute before:top-0 before:left-0 before:h-16 before:w-full before:content-['']",
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuPrimitive.Content
          data-slot="navigation-menu-content"
          className={cn(
            "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
            "group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in",
            "fixed top-21 right-0 left-0 z-60 mx-auto hidden w-[calc(100vw-48px)] overflow-hidden rounded-sm border border-gunmetal p-0 xl:flex",
            isLightTheme ? "bg-white" : "bg-black",
          )}
        >
          {item.group.map((groupItem, groupIndex) => {
            if (groupItem._type === "card") {
              return (
                <div
                  key={`${groupIndex}-${groupItem._key}`}
                  className="group/card relative w-82.75 flex-shrink-0 overflow-hidden border-gunmetal not-first:border-l p-5"
                >
                  <div>
                    <div className="type-heading-2440 mb-24">
                      {groupItem.title}
                    </div>
                    {groupItem.description && (
                      <div className="[&_p]:type-body-1440">
                        <PortableText value={groupItem.description} />
                      </div>
                    )}
                  </div>
                  {groupItem.link?.href && (
                    <Button
                      href={groupItem.link.href}
                      variant={
                        isLightTheme ? "secondary-black" : "secondary-white"
                      }
                      hasArrow={false}
                      className="mt-10"
                    >
                      {groupItem.link.title}
                    </Button>
                  )}
                </div>
              );
            }

            if (groupItem._type === "link-group") {
              const linkGroupIndex =
                (item.group
                  ?.slice(0, groupIndex)
                  .filter((item) => item._type === "link-group").length ?? 0) +
                1;
              return (
                <div
                  key={`${groupIndex}-${groupItem._key}`}
                  className="w-full border-gunmetal not-first:border-l p-5"
                >
                  <LinkGroupSection
                    index={linkGroupIndex}
                    item={groupItem}
                    closeNav={closeDesktopNav}
                    isLightTheme={isLightTheme}
                  />
                </div>
              );
            }

            if (groupItem._type === "resources") {
              if (!groupItem.resources || groupItem.resources.length === 0) {
                return null;
              }

              return (
                <div
                  key={`${groupIndex}-${groupItem._key}`}
                  className="border-gunmetal not-first:border-l"
                >
                  {groupItem.resources.map((resource, resourceIndex) => (
                    <Link
                      key={`${groupIndex}-${resourceIndex}-${resource._key}`}
                      href={resource.href}
                      className={cn(
                        "group flex w-82.75 max-w-full flex-shrink-0 flex-col justify-between p-5",
                        resourceIndex > 0 &&
                          "border-gunmetal not-first:border-t",
                        (groupItem.resources?.length ?? 0) === 1
                          ? "h-full"
                          : "h-1/2",
                      )}
                    >
                      {resource.title && (
                        <div>
                          <div
                            className={cn(
                              "type-mono-1040 mb-4 uppercase",
                              isLightTheme ? "text-gunmetal" : "text-silver",
                            )}
                          >
                            featured
                          </div>
                          <div className="type-body-1440">
                            {toPlainText(resource.title)}
                          </div>
                        </div>
                      )}
                      <div className="flex items-end justify-between">
                        {resource.image &&
                          (groupItem.resources?.length ?? 0) === 1 && (
                            <SanityImage
                              image={resource.image}
                              className="w-22"
                            />
                          )}
                        <div
                          className={cn(
                            "type-mono-1240 flex items-center gap-1 uppercase",
                            isLightTheme ? "text-black" : "text-neon",
                          )}
                        >
                          [ Read Article{" "}
                          <Icon variant="arrow-right" className="w-3" />]
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </NavigationMenuPrimitive.Content>
      </NavigationMenuItem>
    );
  }

  if (item._type === "divider") {
    if (item.type === "dot") {
      return (
        <li className="mr-4" aria-hidden="true" key={`${index}-${item._key}`}>
          <Dot color={isLightTheme ? "black" : "neon"} />
        </li>
      );
    }

    if (item.type === "space") {
      return (
        <li
          className="w-16.25"
          aria-hidden="true"
          key={`${index}-${item._key}`}
        />
      );
    }
  }

  return null;
};

const MobileNavigationMenu = ({
  header,
  open,
  closeNav,
  isLightTheme,
}: {
  header: NavigationHeader;
  open: boolean;
  closeNav: () => void;
  isLightTheme: boolean;
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  const handleAnimationEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      data-state={open ? "open" : "closed"}
      onAnimationEnd={handleAnimationEnd}
      className={cn(
        "fixed inset-0 z-998 h-dvh pt-16 data-[state=closed]:animate-mobileNavClose data-[state=open]:animate-mobileNavOpen",
        isLightTheme ? "bg-white" : "bg-black",
      )}
    >
      <div data-lenis-prevent className="h-full overflow-y-auto pt-11.5">
        <div
          className={cn(
            "container flex h-full flex-col justify-between px-6",
            isLightTheme ? "text-black" : "text-white",
          )}
        >
          <Accordion.Root type="single" collapsible className="space-y-4">
            {header.links?.map((item, index) => {
              // Simple link case
              if (item._type === "link") {
                return (
                  <Transition delay={0.15 * index} key={item._key}>
                    <Button
                      variant="ghost"
                      className="w-full border-b border-b-gunmetal pb-4.25"
                      onClick={closeNav}
                    >
                      <div className="type-mono-1240 flex items-center gap-3 uppercase">
                        <Dot color={isLightTheme ? "black" : "neon"} />
                        {item.title}
                      </div>
                    </Button>
                  </Transition>
                );
              }
              // Group case with accordion
              if (item._type === "group" && item.group) {
                return (
                  <Accordion.Item value={item._key} key={item._key}>
                    <Transition delay={0.15 * index}>
                      <Accordion.Trigger className="group flex w-full items-center justify-between border-b border-b-gunmetal pb-4.25 transition-colors data-[state=open]:border-b-silver">
                        <div className="type-mono-1240 flex items-center gap-3 uppercase">
                          <Dot color={isLightTheme ? "black" : "neon"} />
                          {item.title}
                        </div>
                        <Icon
                          variant="category-x"
                          strokeWidth={0.1}
                          className="size-3 rotate-45 transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90 lg:size-5"
                        />
                      </Accordion.Trigger>
                    </Transition>
                    <Accordion.Content className="w-full overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                      <div className="space-y-6 pt-6 pb-8">
                        {item.group.map((groupItem, groupIndex) => {
                          if (
                            groupItem._type === "card" &&
                            groupItem.link?.href
                          ) {
                            return (
                              <Button
                                key={`${groupIndex}-${groupItem._key}`}
                                link={
                                  groupItem.link as unknown as ResolvedLinkType
                                }
                                variant={
                                  isLightTheme
                                    ? "tertiary-black"
                                    : "tertiary-neon"
                                }
                                onClick={closeNav}
                              >
                                {groupItem.title}
                              </Button>
                            );
                          }

                          if (groupItem._type === "link-group") {
                            const linkGroupIndex =
                              (item.group
                                ?.slice(0, groupIndex)
                                .filter((item) => item._type === "link-group")
                                .length ?? 0) + 1;
                            return (
                              <LinkGroupSection
                                key={`${groupIndex}-${groupItem._key}`}
                                index={linkGroupIndex}
                                item={groupItem}
                                closeNav={closeNav}
                                isLightTheme={isLightTheme}
                              />
                            );
                          }

                          if (groupItem._type === "resources") {
                            if (
                              !groupItem.resources ||
                              groupItem.resources.length === 0
                            ) {
                              return null;
                            }

                            return (
                              <div
                                key={`${groupIndex}-${groupItem._key}`}
                                className="space-y-6"
                              >
                                {groupItem.resources.map(
                                  (resource, resourceIndex) => (
                                    <div
                                      key={`${groupIndex}-${resourceIndex}-${resource._key}`}
                                    >
                                      {resource.title && (
                                        <div>
                                          <div
                                            className={cn(
                                              "type-mono-1040 mb-4 text-silver uppercase",
                                              isLightTheme
                                                ? "text-charcoal"
                                                : "text-silver",
                                            )}
                                          >
                                            featured
                                          </div>
                                          <div className="type-body-1440">
                                            {toPlainText(resource.title)}
                                          </div>
                                        </div>
                                      )}
                                      <Button
                                        href={resource.href}
                                        variant={
                                          isLightTheme
                                            ? "tertiary-black"
                                            : "tertiary-neon"
                                        }
                                        onClick={closeNav}
                                        hasArrow={false}
                                        className="mt-3"
                                      >
                                        [ Read Article{" "}
                                        <Icon
                                          variant="arrow-right"
                                          className="inline"
                                        />{" "}
                                        ]
                                      </Button>
                                    </div>
                                  ),
                                )}
                              </div>
                            );
                          }

                          return null;
                        })}
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              }
              return null;
            })}
          </Accordion.Root>
          {/* Always add pb-16 for mobile nav scrollability to leave space at the bottom of the menu */}
          <div className="pb-16">
            {header.ctaLinks?.length && header.ctaLinks?.length > 0 && (
              <div className="mt-10 flex flex-wrap justify-between gap-x-4 gap-y-5">
                {header.ctaLinks?.map((link, index) => {
                  // Determine variant based on theme and index
                  let variant: Parameters<typeof Button>[0]["variant"];
                  if (index === 0) {
                    variant = "ghost";
                  } else if (index === 1) {
                    variant = isLightTheme ? "tertiary-black" : "tertiary-neon";
                  } else {
                    variant = "primary-neon-black-small";
                  }
                  return (
                    <Transition
                      delay={0.15 * index}
                      key={link._key}
                      className={index === 2 ? "w-full" : undefined}
                    >
                      <Button
                        link={link}
                        hasArrow={false}
                        variant={variant}
                        className="w-full uppercase"
                        onClick={closeNav}
                      >
                        {link.title}
                      </Button>
                    </Transition>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkGroupSection = ({
  index,
  item,
  closeNav,
  isLightTheme,
}: {
  index: number;
  item: LinkGroupItem;
  closeNav?: () => void;
  isLightTheme: boolean;
}) => {
  return (
    <div>
      {item.title && (
        <div className="mb-6 xl:mb-18">
          <div className="type-mono-1040 mb-4 text-silver">0{index}</div>
          <div className="type-body-1440">{item.title}</div>
        </div>
      )}
      <ul className="flex flex-col gap-y-1 xl:gap-y-0">
        {item.links?.map((link, index) => (
          <li key={index} className="flex w-full">
            <FooterLink
              link={link}
              className="flex-1"
              onClick={closeNav}
              isLightTheme={isLightTheme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const NavigationMenuWithoutViewport = ({
  className,
  children,
  value,
  onValueChange,
  ...props
}: NavigationMenuRootProps & {
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const rootProps = {
    ...props,
    value,
    onValueChange,
    "data-slot": "navigation-menu",
    "data-viewport": false,
    className: cn("group/navigation-menu", className),
  } as React.ComponentProps<typeof NavigationMenuPrimitive.Root>;

  return (
    <NavigationMenuPrimitive.Root {...rootProps}>
      {children}
    </NavigationMenuPrimitive.Root>
  );
};
