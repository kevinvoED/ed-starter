"use client";

import type { BANNER_QUERY_RESULT } from "@/sanity.types";
import { useEffect, useMemo, useRef, useState } from "react";
import cn from "cnfast";
import gsap from "gsap";
import { Transition } from "@/components/animations/Transition";
import { Button } from "@/components/primitives/Button/Button";
import { PortableText as PortableTextRenderer } from "@/components/primitives/PortableText/PortableText";

type BannerItem = NonNullable<
  NonNullable<BANNER_QUERY_RESULT[0]["banners"]>[number]
>;

function createBannerVersion(banner: BannerItem): string {
  const contentString = JSON.stringify({
    state: banner.state,
    description: banner.description,
  });

  let hash = 0;
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `${banner._key}_v${hash}`;
}

export const BannerPrimitive = ({
  bannerData,
}: {
  bannerData: BANNER_QUERY_RESULT;
}) => {
  const [visibleBanners, setVisibleBanners] = useState<string[]>([]);
  const [containerAnimating, setContainerAnimating] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  const bannerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Cast needed until pnpm typegen is run with the corrected query (removed -> on inline objects)
  const banners = useMemo(
    () => (bannerData[0]?.banners as BannerItem[] | null) ?? [],
    [bannerData],
  );

  // Resolve which banners should be visible from localStorage on mount
  useEffect(() => {
    if (!banners.length) return;

    const closedBanners: Record<string, boolean> = JSON.parse(
      localStorage.getItem("closedBanners") || "{}",
    );

    // Remove stale version keys for banners that no longer exist or have changed
    const currentVersions = new Set(banners.map(createBannerVersion));
    let hasCleanup = false;
    const cleanedClosedBanners: Record<string, boolean> = {};

    for (const [versionKey, value] of Object.entries(closedBanners)) {
      const bannerId = versionKey.split("_v")[0];
      const bannerStillExists = banners.some((b) => b._key === bannerId);
      const versionStillExists = currentVersions.has(versionKey);

      if (bannerStillExists && versionStillExists) {
        cleanedClosedBanners[versionKey] = value;
      } else {
        hasCleanup = true;
      }
    }

    if (hasCleanup) {
      localStorage.setItem(
        "closedBanners",
        JSON.stringify(cleanedClosedBanners),
      );
    }

    const initialVisible = banners
      .filter((banner) => !cleanedClosedBanners[createBannerVersion(banner)])
      .map((banner) => banner._key);

    setVisibleBanners(initialVisible);
  }, [banners]);

  // Animate container height open on first render when banners become visible
  useEffect(() => {
    if (!visibleBanners.length || !containerRef.current || entranceComplete)
      return;

    const container = containerRef.current;

    gsap.set(container, {
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      overflow: "hidden",
    });

    requestAnimationFrame(() => {
      gsap.set(container, {
        height: "auto",
        paddingTop: 24,
        paddingBottom: 24,
      });
      const targetHeight = container.offsetHeight;

      gsap.set(container, { height: 0, paddingTop: 0, paddingBottom: 0 });
      gsap.to(container, {
        height: targetHeight,
        paddingTop: 24,
        paddingBottom: 24,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => setEntranceComplete(true),
      });
    });
  }, [visibleBanners, entranceComplete]);

  // Recalculate container height after a banner is dismissed
  useEffect(() => {
    if (!entranceComplete || !containerRef.current || !visibleBanners.length)
      return;

    const container = containerRef.current;
    const currentHeight = container.offsetHeight;

    gsap.set(container, { height: "auto" });
    const newHeight = container.offsetHeight;

    if (currentHeight !== newHeight) {
      gsap.set(container, { height: currentHeight });
      gsap.to(container, {
        height: newHeight,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [visibleBanners, entranceComplete]);

  const handleBannerClose = (bannerId: string) => {
    const bannerElement = bannerRefs.current[bannerId];
    if (!bannerElement) return;

    const remainingBanners = visibleBanners.filter((id) => id !== bannerId);
    const isLastBanner = remainingBanners.length === 0;

    // Collapse the entire container alongside the last banner
    if (isLastBanner && containerRef.current) {
      setContainerAnimating(true);
      gsap.to(containerRef.current, {
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setVisibleBanners((prev) => prev.filter((id) => id !== bannerId));
        if (isLastBanner) setContainerAnimating(false);
      },
    });

    tl.to(bannerElement, {
      opacity: 0,
      y: -8,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      bannerElement,
      { height: 0, marginBottom: 0, duration: 0.3, ease: "power2.out" },
      "-=0.1",
    );

    // Persist dismissal using the content-versioned key
    const closedBanners: Record<string, boolean> = JSON.parse(
      localStorage.getItem("closedBanners") || "{}",
    );
    const bannerItem = banners.find((b) => b._key === bannerId);
    if (bannerItem) {
      closedBanners[createBannerVersion(bannerItem)] = true;
      localStorage.setItem("closedBanners", JSON.stringify(closedBanners));
    }
  };

  if (!banners.length) return null;
  if (!visibleBanners.length && !containerAnimating && entranceComplete)
    return null;

  return (
    <div
      ref={containerRef}
      className="f-mx-12/16 flex flex-col overflow-hidden"
    >
      {banners.map((banner, index) => {
        if (!visibleBanners.includes(banner._key)) return null;

        return (
          <Transition
            key={banner._key}
            animateOnScroll={false}
            delay={index * 0.05}
          >
            <div
              ref={(el) => {
                bannerRefs.current[banner._key] = el;
              }}
              className="mb-4"
            >
              <header
                className={cn(
                  "flex items-center justify-between rounded-lg p-4",
                  banner.state === "alert" && "bg-debug-red text-white",
                  banner.state === "default" && "bg-charcoal/10",
                  banner.state === "positive" && "bg-debug-blue text-white",
                )}
                data-state={banner.state}
              >
                {banner.description && (
                  <PortableTextRenderer value={banner.description} />
                )}
                <Button
                  onClick={() => handleBannerClose(banner._key)}
                  aria-label="Close banner"
                  variant="banner"
                  className="bg-black p-3"
                >
                  Close
                </Button>
              </header>
            </div>
          </Transition>
        );
      })}
    </div>
  );
};
