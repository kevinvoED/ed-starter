import { fetchSanityBanner } from "@/sanity/lib/fetch";
import { BannerPrimitive } from "@/components/primitives/Banner/BannerPrimitive";

export const Banner = async () => {
  const data = await fetchSanityBanner();

  if (!data || data.length <= 0) return null;

  return <BannerPrimitive bannerData={data} />;
};
