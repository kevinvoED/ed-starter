import { LinkIcon } from "@sanity/icons";
import { cta, image, logo, title } from "@/schemas/sharedFields";
import { defineField, defineType } from "sanity";

export const navigation = defineType({
	name: "navigation",
	title: "Navigation",
	type: "document",
	icon: LinkIcon,
	fields: [
		defineField({
			name: "mainLinks",
			title: "Main Links",
			type: "array",
			of: [
				{
					name: "mainLinkGroup",
					title: "Main Link Group",
					type: "object",
					icon: LinkIcon,
					fields: [
						defineField({
							...title,
							title: "Main Link Title",
						}),
						defineField({
							...image,
							options: { collapsible: true, collapsed: true },
							validation: (Rule) => Rule,
						}),
						defineField({
							name: "subLinks",
							title: "Sub Links",
							type: "array",
							of: [
								{
									name: "subLink",
									title: "Sub Link",
									type: "object",
									icon: LinkIcon,
									fields: [
										defineField({
											...logo,
										}),
										defineField({
											...cta,
										}),
									],
									preview: {
										select: {
											title: "cta.label",
											logo: "logo",
										},
										prepare({ title, logo }) {
											return {
												title: title,
												media: logo,
											};
										},
									},
								},
							],
						}),
					],
					preview: {
						select: {
							title: "title",
							image: "image",
							subLinks: "subLinks",
						},
						prepare({ title, subLinks, image }) {
							const subLinkTitles = subLinks
								?.map(
									(subLink: { cta: { label: string } }) => subLink?.cta?.label,
								)
								.filter(Boolean);
							return {
								title: title,
								media: image,
								subtitle: subLinkTitles?.join(", ") || "",
							};
						},
					},
				},
			],
		}),
		defineField({
			name: "extraLinks",
			title: "Extra Links",
			type: "array",
			of: [
				{
					name: "mainLinkGroup",
					title: "Main Link Group",
					type: "object",
					icon: LinkIcon,
					fields: [
						defineField({
							...cta,
							title: "Main Link Title",
						}),
					],
					preview: {
						select: {
							title: "cta.label",
						},
						prepare({ title }) {
							return {
								title: title,
							};
						},
					},
				},
			],
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
