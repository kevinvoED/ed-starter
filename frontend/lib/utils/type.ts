import type { GetPageQueryResult, Post } from "@/sanity.types";

export type ImageType = Extract<
	NonNullable<NonNullable<Post>["coverImage"]>,
	{ _type: "image" }
>;

export type ModuleType = Extract<
	NonNullable<NonNullable<GetPageQueryResult>["modules"]>[number],
	{ _type: "" }
>;

export type SanityImageType = {
	asset?: {
		_ref: string;
		_type: "reference";
		_weak?: boolean;
	};
	crop?: {
		_type: "sanity.imageCrop";
		top: number;
		bottom: number;
		left: number;
		right: number;
	};
	hotspot?: {
		_type: "sanity.imageHotspot";
		x: number;
		y: number;
		height: number;
		width: number;
	};
	alt?: string;
	_type: "image";
};
