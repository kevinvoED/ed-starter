import { Button } from "@/components/Button/Button";
import { SanityImage } from "@/components/Image/SanityImage";
import type { HeroPrimary as HeroPrimaryProps } from "@/sanity.types";

export const HeroPrimary = ({
  title,
  description,
  image,
  ctas,
}: HeroPrimaryProps) => {
  return (
    <div className="relative overflow-hidden py-12 lg:py-25">
      <div className="grid-custom container gap-y-6">
        <h2 className="col-span-full lg:col-span-5">{title}</h2>

        <p className="col-span-full lg:col-span-5 lg:col-start-1">
          {description}
        </p>

        <div className="col-span-full lg:col-span-5 lg:col-start-1">
          {image && <SanityImage image={image} sizes="100vw" />}
        </div>

        <div className="col-span-full space-x-2 lg:col-span-5 lg:col-start-1">
          {ctas?.map((cta) => (
            <Button key={cta._key} cta={cta}>
              {cta.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
