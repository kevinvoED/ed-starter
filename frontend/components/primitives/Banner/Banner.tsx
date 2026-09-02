import type { DynamicFetchOptions } from "@/sanity/lib/live";
import { BannerPrimitive } from "@/components/primitives/Banner/BannerPrimitive";
import { fetchSanityBanner } from "@/sanity/lib/fetch";

export const Banner = async ({ perspective, stega }: DynamicFetchOptions) => {
  "use cache";
  const data = await fetchSanityBanner({ perspective, stega });

  if (!data?.length) return null;

  return <BannerPrimitive bannerData={data} />;
};
