import { DashboardIcon } from "@sanity/icons";
import {
	ctas,
	description,
	image,
	portableText,
	title,
} from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

export const heroPrimary = defineType({
	name: "heroPrimary",
	title: "Hero Primary",
	type: "object",
	icon: DashboardIcon,
	fields: [
		defineField({
			...title,
		}),
		defineField({
			...description,
		}),
		defineField({
			...image,
		}),
		defineField({
			...ctas,
		}),
		defineField({
			...portableText,
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: "Hero Primary",
				subtitle: title || "No title provided",
			};
		},
	},
});
