"use client";

import type { BANNER_QUERY_RESULT } from "@/sanity.types";
import { useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button/Button";
import { PortableText } from "@/components/primitives/PortableText/PortableText";

// Taken from Brinqa
// TODO: refactor and improve

// Create a content-based version identifier for the banner
function createBannerVersion(
  banner: NonNullable<BANNER_QUERY_RESULT>[0],
): string {
  const contentString = JSON.stringify({
    title: banner.title,
    description: banner.description,
    link: banner.link,
  });

  let hash = 0;
  for (let i = 0; i < contentString.length; i++) {
    const char = contentString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `banner_v${hash}`;
}

export const BannerPrimitive = ({
  bannerData,
}: {
  bannerData: BANNER_QUERY_RESULT;
}) => {
  const [data, _] = useState<BANNER_QUERY_RESULT>(bannerData);
  const [isVisible, setIsVisible] = useState(false);

  // Handle visibility based on localStorage
  useEffect(() => {
    if (!data) return;

    const closedBanners: Record<string, boolean> = JSON.parse(
      localStorage.getItem("closedBanners") || "{}",
    );

    const currentVersion = createBannerVersion(data[0]);

    // Cleanup: Remove old banner versions that no longer match current content
    let hasCleanup = false;
    const cleanedBanners: Record<string, boolean> = {};

    for (const [versionKey, value] of Object.entries(closedBanners)) {
      const storedBannerId = versionKey.split("_v")[0];

      // Keep if this is a different banner OR if it matches the current version
      if (storedBannerId !== "banner" || versionKey === currentVersion) {
        cleanedBanners[versionKey] = value;
      } else {
        hasCleanup = true;
      }
    }

    // Update localStorage if we cleaned anything up
    if (hasCleanup) {
      localStorage.setItem("closedBanners", JSON.stringify(cleanedBanners));
    }

    // Show banner if this specific version hasn't been closed
    const shouldShow = !cleanedBanners[currentVersion];
    setIsVisible(shouldShow);
  }, [data]);

  const handleClose = () => {
    if (!data) return;

    setIsVisible(false);

    const closedBanners: Record<string, boolean> = JSON.parse(
      localStorage.getItem("closedBanners") || "{}",
    );

    const bannerVersion = createBannerVersion(data[0]);
    closedBanners[bannerVersion] = true;
    localStorage.setItem("closedBanners", JSON.stringify(closedBanners));
  };

  if (!data || !isVisible) {
    return null;
  }

  const banner = data[0];

  return (
    <header className="flex items-center justify-between bg-debug-red p-custom py-2 text-black">
      <div className="flex items-center gap-4">
        {banner.title && <PortableText value={banner.title} />}
        {banner.description && <PortableText value={banner.description} />}
      </div>

      <Button
        onClick={handleClose}
        type="button"
        aria-label="Close banner"
        variant="ghost"
        width="fit"
        className="size-5 rounded-full bg-debug-blue text-white"
      >
        <span className="-translate-y-0.25">×</span>
      </Button>
    </header>
  );
};
