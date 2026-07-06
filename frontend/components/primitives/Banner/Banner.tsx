import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { fetchSanityBanner } from "@/sanity/lib/fetch";
import { BannerPrimitive } from "@/components/primitives/Banner/BannerPrimitive";

export const Banner = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";
  const data = await fetchSanityBanner({ perspective, stega });

  if (!data || data[0]._key === null) return null;

  return <BannerPrimitive bannerData={data} />;
};
