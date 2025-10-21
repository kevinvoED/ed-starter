import { ComponentIcon } from "@sanity/icons";
import { cta, description, image, title } from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

// Remember to change the icon to suit your new schema

export const navigation = defineType({
	name: "navigation",
	title: "Navigation",
	type: "document",
	icon: ComponentIcon,
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
			...cta,
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: "Navigation",
				subtitle: title || "No title provided",
			};
		},
	},
});
