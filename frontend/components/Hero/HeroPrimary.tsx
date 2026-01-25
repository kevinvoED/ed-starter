import type { BlockProps } from "@/sanity/lib/fetch";
import { PortableText } from "@/components/PortableText/PortableText";

type HeroPrimaryProps = BlockProps<"hero-primary">;

export const HeroPrimary = ({ title }: HeroPrimaryProps) => {
  return <div>{title && <PortableText value={title} />}</div>;
};
