"use client";

import type { BlockProps } from "@/sanity/lib/fetch";
import { useGSAP } from "@gsap/react";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { AccordionIconScroll } from "@/components/Accordion/AccordionIconScroll";
import { Button } from "@/components/Button/Button";
import { CodeSnippet } from "@/components/Code/CodeSnippet";
import { Eyebrow } from "@/components/Eyebrow/Eyebrow";
import { TextReveal } from "@/components/GSAP/TextReveal";
import { Transition } from "@/components/GSAP/Transition";
import { Icon } from "@/components/Icon/Icon";
import { SanityImage } from "@/components/Media/SanityImage";
import {
  PortableText,
  PortableTextFragment,
} from "@/components/PortableText/PortableText";
import { cn } from "@/lib/utils";
import { geoGraticule } from "d3-geo";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

type HeroSecondaryProps = BlockProps<"hero-secondary">;

const ScrollText = () => (
  <Transition
    animation="fadeInDown"
    delay={1.5}
    className="parallax-item type-mono-1240 flex items-center gap-x-4 text-alabaster uppercase"
    data-gsap-parallax-offset="100"
  >
    Scroll
    <Icon variant="arrow-down" size={11} />
  </Transition>
);

const DescriptionCtaBlock = ({
  description,
  links,
  className = "",
}: Pick<HeroSecondaryProps, "description" | "links"> & {
  className: string;
}) => (
  <Transition
    delay={1.5}
    className={`col-span-full md:col-span-4 md:col-start-6 ${className}`}
  >
    <div
      className="parallax-item grid-custom grid-cols-4"
      data-gsap-parallax-offset="120"
    >
      <div className="col-span-full md:col-span-3">
        {description && <PortableText value={description} />}
      </div>
    </div>
    <div className="mt-15 md:mt-27">
      <div
        className="parallax-item flex flex-wrap justify-between gap-x-17 gap-y-10 md:justify-start"
        data-gsap-parallax-offset="100"
      >
        {links?.map((link, index) => (
          <Button
            key={link._key}
            link={link}
            variant={index === 0 ? "secondary-white" : "tertiary-neon"}
            hasArrow={index === 0}
          >
            {link.title}
          </Button>
        ))}
      </div>
    </div>
  </Transition>
);

export const HeroSecondary = ({
  type,
  eyebrow,
  title,
  description,
  links,
  image,
  codeSnippet,
  contentEyebrow,
  contentBlocks,
  itemsLabel,
  items,
}: HeroSecondaryProps) => {
  const [activeItem, setActiveItem] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const assetContainerRef = useRef<HTMLDivElement>(null);
  const assetChildContainerRef = useRef<HTMLDivElement>(null);
  const globeContainerRef = useRef<HTMLDivElement>(null);
  // biome-ignore lint/suspicious/noExplicitAny: this is react-globe.gl
  const globeRef = useRef<any>(null);
  const isGlobe = type === "globe";

  const graticules = useMemo(() => {
    return geoGraticule()
      .extent([
        [-180, -90],
        [180, 90],
      ]) // ensure full globe coverage
      .step([4, 4]) // 4° step
      .lines();
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const mm = gsap.matchMedia();

      // only mobile < 768px
      mm.add("(min-width: 767px)", () => {
        const items =
          containerRef.current!.querySelectorAll<HTMLElement>(".parallax-item");

        const triggers = Array.from(items).map((item) => {
          const y = Number(item.dataset.gsapParallaxOffset || 150);

          return gsap.to(item, {
            y: y * -1,
            ease: "power2.in",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "top 20%",
              scrub: true,
            },
          });
        });

        return () => {
          // biome-ignore lint/suspicious/useIterableCallbackReturn: forEach
          triggers.forEach((t) => t.scrollTrigger?.kill());
        };
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!containerRef.current || !assetContainerRef.current) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const spacing = 24;

        const st = ScrollTrigger.create({
          trigger: assetContainerRef.current,
          start: `bottom bottom-=${spacing}`,
          endTrigger: containerRef.current,
          end: `bottom bottom+=${spacing}`,
          pin: true,
          pinSpacing: false,
        });

        // optional cleanup when media query no longer matches
        return () => st.kill();
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!containerRef.current || !assetChildContainerRef.current || !isGlobe)
        return;

      const mm = gsap.matchMedia();

      // Desktop / tablet: scale with scroll
      mm.add("(min-width: 768px)", () => {
        const tween = gsap.fromTo(
          assetChildContainerRef.current!,
          { scale: 0.4 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current!,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // Mobile: force scale to 1 (no animation)
      mm.add("(max-width: 767px)", () => {
        gsap.set(assetChildContainerRef.current!, { scale: 1 });

        return () => {
          gsap.set(assetChildContainerRef.current!, {
            clearProps: "transform",
          });
        };
      });
    },
    { scope: containerRef, dependencies: [isGlobe] },
  );

  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!globeContainerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });

    observer.observe(globeContainerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="bg-black p-custom pb-60-140-220 text-white"
      data-nav-theme="dark"
    >
      <div ref={containerRef}>
        <div className="flex h-screen flex-col justify-between pt-80-160-220 md:pb-40-60-100">
          <div className="grid-custom-md h-screen md:h-auto">
            <div className="relative 4xl:col-span-5 col-span-full md:col-span-6">
              {eyebrow && (
                <Transition
                  delay={1.5}
                  className="mb-4 md:absolute md:top-0 md:left-0 md:mb-0"
                >
                  <Eyebrow variant="dot-neon">{eyebrow}</Eyebrow>
                </Transition>
              )}
              {title && (
                <TextReveal>
                  <h1 className="[&_p]:typef-heading-32-64-80 text-charcoal [&_.line-wrapper:first-of-type]:md:indent-text-reveal-2col [&_p]:leading-none">
                    <PortableText value={title} />
                  </h1>
                </TextReveal>
              )}
            </div>
            <DescriptionCtaBlock
              description={description}
              links={links}
              className="mt-15 md:mt-0 md:hidden"
            />
          </div>
          <div className="grid-custom-md mt-20 items-end">
            {isGlobe ? (
              <div
                ref={assetContainerRef}
                className="col-span-full md:col-span-5"
              >
                <div
                  ref={assetChildContainerRef}
                  className="w-full origin-bottom-left scale-100 md:absolute md:bottom-0 md:left-0 md:scale-40"
                >
                  <div className="border border-gunmetal">
                    <div
                      ref={globeContainerRef}
                      className="relative aspect-[646/526] p-6"
                    >
                      <Globe
                        ref={globeRef}
                        globeImageUrl="/images/map-dark.jpg"
                        width={size.width}
                        height={size.height}
                        {...({ animateIn: false } as { animateIn?: boolean })}
                        backgroundColor="#141414"
                        showAtmosphere={false}
                        pathsData={graticules}
                        pathPoints={(line: {
                          coordinates?: [number, number][];
                        }) =>
                          Array.isArray(line.coordinates)
                            ? line.coordinates
                            : []
                        }
                        pathColor={() => "rgba(65,65,65,0.8)"}
                        pathStroke={0.7}
                        onGlobeReady={() => {
                          const controls = globeRef.current.controls();

                          // disable user interaction
                          controls.enableRotate = false;
                          controls.enableZoom = false;
                          controls.enablePan = false;

                          // auto rotate
                          controls.autoRotate = true;
                          controls.autoRotateSpeed = 0.6;

                          requestAnimationFrame(() => {
                            globeRef.current.camera().position.z = 300;
                            globeRef.current.pointOfView(
                              { lat: 65, lng: -135 },
                              0,
                            );
                          });
                        }}
                      />
                      {items?.map((item) => {
                        return (
                          <div
                            key={item._key}
                            className={cn(
                              "absolute inset-0 transition-opacity duration-300",
                              item._key === activeItem
                                ? "opacity-100"
                                : "pointer-events-none opacity-0",
                            )}
                          >
                            {item.images?.[0] && (
                              <div className="absolute top-6 left-6 h-[61.4%] w-1/2">
                                <SanityImage
                                  image={item.images[0]}
                                  sizes="323px"
                                  className="size-full object-contain object-top-left"
                                />
                              </div>
                            )}

                            {item.images?.[1] && (
                              <div className="absolute right-6 bottom-6 h-[61.4%] w-1/2">
                                <SanityImage
                                  image={item.images[1]}
                                  sizes="323px"
                                  className="size-full object-contain object-bottom-right"
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {codeSnippet?.code && (
                      <>
                        <hr className="border-gunmetal" />
                        <div className="px-8 py-15">
                          <CodeSnippet codeBlock={codeSnippet?.code} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div
                ref={assetContainerRef}
                className="col-span-full md:col-span-2"
              >
                {image && (
                  <SanityImage
                    image={image}
                    sizes="(max-width: 1024): 100vw, 17vw"
                    className="size-full object-contain"
                  />
                )}
              </div>
            )}

            <DescriptionCtaBlock
              description={description}
              links={links}
              className="hidden md:block"
            />
            <div className="col-span-full hidden justify-end md:col-span-1 md:col-start-12 md:flex">
              <ScrollText />
            </div>
          </div>
        </div>
        <div className="grid-custom-md pt-80-120-160">
          <div className="col-span-full space-y-10 md:col-span-7 md:col-start-6 md:space-y-25">
            {contentBlocks &&
              contentBlocks.length > 0 &&
              contentBlocks.map((block, index) => {
                return (
                  <div
                    key={block._key}
                    className="parallax-item [&_p]:typef-heading-24-40-48 relative"
                    data-gsap-parallax-offset="300"
                  >
                    {index === 0 && contentEyebrow && (
                      <div className="md:absolute md:top-0 md:left-0">
                        <Eyebrow variant="dot-neon">{contentEyebrow}</Eyebrow>
                      </div>
                    )}
                    {block.content && (
                      <PortableText
                        value={block.content}
                        className={`${index === 0 && "mt-4 md:mt-0 md:indent-2col"}`}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        {isGlobe && items && (
          <div className="grid-custom-md mt-20 md:mt-40">
            <div className="col-span-full space-y-10 md:col-span-5 md:col-start-8 md:space-y-16 md:pb-40">
              {itemsLabel && (
                <div className="type-body-1040 uppercase">
                  <PortableTextFragment value={itemsLabel} />
                </div>
              )}
              {items && (
                <AccordionIconScroll
                  items={items}
                  columns={5}
                  style="dark"
                  onActiveChange={(key) => setActiveItem(key)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
