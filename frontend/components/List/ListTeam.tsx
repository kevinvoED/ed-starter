"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { toPlainText } from "next-sanity";
import gsap from "gsap";
import { Button } from "@/components/Button/Button";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { PortableText } from "@/components/PortableText/PortableText";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/Sheet/Sheet";
import { cn } from "@/lib/utils";

type ListTeamProps = BlockProps<"list-team">;

export const ListTeam = ({ staffMembers }: ListTeamProps) => {
  return (
    <ul className="p-custom py-40-80-160" data-nav-theme="light">
      {staffMembers.map(({ _key, staff, description, articles }) => (
        <MemberItem
          key={_key}
          staff={staff}
          description={description}
          articles={articles}
        />
      ))}
    </ul>
  );
};

const MemberItem = ({
  staff,
  description,
  articles,
}: {
  staff: ListTeamProps["staffMembers"][number]["staff"];
  description: ListTeamProps["staffMembers"][number]["description"];
  articles: ListTeamProps["staffMembers"][number]["articles"];
}) => {
  const containerRef = useRef<HTMLLIElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (
      !containerRef.current ||
      !backgroundRef.current ||
      !nameRef.current ||
      !roleRef.current ||
      !descriptionRef.current
    ) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (
        !containerRef.current ||
        !backgroundRef.current ||
        !nameRef.current ||
        !roleRef.current ||
        !descriptionRef.current
      ) {
        return;
      }

      gsap.set(nameRef.current, { x: 0 });
      gsap.set(backgroundRef.current, { opacity: 0 });
      gsap.set(descriptionRef.current, { opacity: 0 });

      const handleMouseEnter = () => {
        // Allow animation to trigger even if you quickly re-hover
        gsap.killTweensOf([nameRef.current, backgroundRef.current]);

        gsap.to(nameRef.current, { x: 112, duration: 0.5, ease: "power2.out" });
        gsap.set(backgroundRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.set(descriptionRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.set(roleRef.current, {
          backgroundColor: "#000000",
          color: "#ffffff",
          duration: 0,
        });
      };

      const handleMouseLeave = () => {
        gsap.killTweensOf([nameRef.current, backgroundRef.current]);

        gsap.to(nameRef.current, {
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(backgroundRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.set(descriptionRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(roleRef.current, {
          backgroundColor: "#D4FF00",
          color: "#000000",
          duration: 0,
        });
      };

      const container = containerRef.current;
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li
          ref={containerRef}
          className="group relative cursor-pointer lg:min-h-[121px]"
        >
          {/* Neon background element */}
          <div
            ref={backgroundRef}
            className="absolute inset-0 bg-neon"
            aria-hidden="true"
            style={{ opacity: 0 }}
          />

          <Transition className="grid-custom relative z-10 border-alabaster border-t py-4">
            {staff?.role && (
              <div
                className="type-mono-1240 col-span-full max-h-fit max-w-fit bg-neon px-0.5 py-px uppercase lg:col-span-3 lg:col-start-1"
                ref={roleRef}
              >
                {staff.role}
              </div>
            )}
            {staff?.name && (
              <h2
                ref={nameRef}
                className="type-heading-2430 lg:type-heading-6430 col-span-3 lg:col-span-4 lg:col-start-5"
              >
                {staff.name}
              </h2>
            )}
            <button
              type="button"
              className="type-mono-1240 col-start-[-1] flex -translate-y-5 items-center gap-x-2.5 uppercase lg:hidden"
            >
              [ <Icon variant="arrow-right" className="size-3" /> ]
            </button>
            <div
              className="hidden lg:col-span-3 lg:col-start-10 lg:block lg:space-y-4"
              ref={descriptionRef}
            >
              {staff?.bio && <PortableText value={staff.bio} />}
              <button type="button" className="type-mono-1240 uppercase">
                [ Read More ]
              </button>
            </div>
          </Transition>
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="py-15 lg:pt-18 lg:pb-6">
          <SheetTitle>
            <div className="space-y-6 lg:space-y-10">
              <div className="space-y-2 lg:space-y-4">
                <div className="space-y-4 lg:space-y-5">
                  {staff?.role && (
                    <Eyebrow variant="dot-black">{staff.role}</Eyebrow>
                  )}
                  {staff?.name && (
                    <h2 className="typef-heading-32-48-64">{staff.name}</h2>
                  )}
                </div>
                {staff?.role && (
                  <div className="type-heading-1630 lg:type-heading-2430 text-charcoal">
                    {staff.role}
                  </div>
                )}
              </div>
              {staff?.links && (
                <div>
                  {staff.links.map((link) => (
                    <Button
                      key={link._key}
                      variant="secondary-black"
                      link={link}
                    >
                      Connect on {link.title}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </SheetTitle>

          {description && (
            <div
              className={cn(
                "pt-15 lg:pt-14 [&_p]:first:mb-12",
                articles &&
                  articles.length > 0 &&
                  "border-alabaster border-b pb-15 lg:pb-12",
              )}
            >
              <PortableText value={description} />
            </div>
          )}

          {articles && articles.length > 0 && (
            <div className="space-y-4 pt-15 lg:space-y-8 lg:pt-12">
              {staff?.name && (
                <h3 className="type-heading-3230">
                  Published Work by {staff.name}
                </h3>
              )}
              <ul className="grid-custom col-span-full grid-cols-3 gap-x-4 gap-y-0">
                {articles?.map((article) => (
                  <ArticleItem key={article.href} article={article} />
                ))}
              </ul>
            </div>
          )}
        </SheetHeader>

        <SheetFooter>
          <SheetClose asChild>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const ArticleItem = ({
  article,
}: {
  article: NonNullable<
    ListTeamProps["staffMembers"][number]["articles"]
  >[number];
}) => {
  const sheetContainerRef = useRef<HTMLLIElement>(null);
  const sheetBackgroundRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!sheetContainerRef.current || !sheetBackgroundRef.current) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!sheetContainerRef.current || !sheetBackgroundRef.current) {
        return;
      }

      gsap.set(sheetBackgroundRef.current, { width: "0" });

      let expandComplete = true;
      let shouldCollapse = false;

      const handleMouseEnter = () => {
        shouldCollapse = false;
        expandComplete = false;

        gsap.killTweensOf([sheetBackgroundRef.current]);

        gsap.to(sheetBackgroundRef.current, {
          width: "auto",
          duration: 0.5,
          ease: "power4.out",
          onComplete: () => {
            expandComplete = true;
            if (shouldCollapse) {
              gsap.to(sheetBackgroundRef.current, {
                width: 0,
                duration: 0.4,
                ease: "power4.out",
              });
            }
          },
        });
      };

      const handleMouseLeave = () => {
        if (expandComplete) {
          gsap.to(sheetBackgroundRef.current, {
            width: 0,
            duration: 0.5,
            ease: "power4.out",
          });
        } else {
          shouldCollapse = true;
        }
      };

      const container = sheetContainerRef.current;
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <li className="col-span-full" ref={sheetContainerRef}>
      <div className="grid-custom relative gap-x-6 gap-y-2 border-alabaster border-b py-4 lg:gap-x-7">
        <div
          ref={sheetBackgroundRef}
          id="neon-bg"
          className="absolute inset-0 z-5 bg-neon"
          aria-hidden="true"
          style={{ width: 0 }}
        />

        {article?._type && (
          <Eyebrow variant="dot-black" className="z-10 col-span-full">
            {article._type}
          </Eyebrow>
        )}
        {article?.title && (
          <Button
            href={article.href}
            hasArrow={false}
            variant="card"
            className="type-body-1450 lg:type-body-1660 z-10 col-span-full whitespace-pre-wrap lg:col-span-11"
          >
            {toPlainText(article.title)}
          </Button>
        )}

        <Icon
          strokeWidth={1.5}
          variant="arrow-right"
          className="z-10 -col-start-1 size-3 self-center lg:-translate-x-6"
        />
      </div>
    </li>
  );
};
