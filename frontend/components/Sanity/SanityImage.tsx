import type { SanityImageType } from "@/lib/utils/type";
import { Image } from "next-sanity/image";
import {
	getImageDimensions,
	type SanityImageSource,
} from "@sanity/asset-utils";
import { stegaClean } from "@sanity/client/stega";
import { cn } from "@/lib/utils/cn";
import { urlForImage } from "@/sanity/lib/utils";

type CoverImageProps = {
	image: SanityImageType;
	sizes?: string;
	priority?: boolean;
	quality?: number;
	className?: string;
};

export const SanityImage = ({
	image,
	sizes,
	quality,
	priority = false,
	className,
}: CoverImageProps) => {
	if (!image || !image.asset?._ref) {
		return null;
	}

	return (
		<Image
			className={cn("object-cover", className)}
			width={getImageDimensions(image as SanityImageSource).width}
			height={getImageDimensions(image as SanityImageSource).height}
			alt={stegaClean(image?.alt) || ""}
			src={urlForImage(image)?.url() as string}
			priority={priority}
			quality={quality || 75}
			sizes={sizes || ""}
		/>
	);
};
