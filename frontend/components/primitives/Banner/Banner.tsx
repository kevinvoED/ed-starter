import { fetchSanityBanner } from "@/sanity/lib/fetch";
import { BannerPrimitive } from "@/components/primitives/Banner/BannerPrimitive";

export const Banner = async () => {
  const data = await fetchSanityBanner();

  if (!data || data[0]._key === null) return null;

  return <BannerPrimitive bannerData={data} />;
};
