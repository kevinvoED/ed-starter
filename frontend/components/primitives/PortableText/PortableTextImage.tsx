import {
  type ResolvedImageType,
  SanityImage,
} from "@/components/primitives/Image/SanityImage";
import { cn } from "@/lib/utils/cn";

export const PortableTextImage = (props: ResolvedImageType) => {
  return (
    <figure className="mb-12 max-h-fit">
      <SanityImage
        image={props}
        className={cn(
          "overflow-hidden object-contain",
          "h-full max-h-70 w-full max-w-fit lg:max-h-138",
        )}
        sizes="(max-width: 768px) 100vw, 75vw"
        priority={true}
      />
    </figure>
  );
};
