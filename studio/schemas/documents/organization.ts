import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import { logo } from "@/schemas/sharedFields";

export default defineType({
	name: "organization",
	title: "Organization",
	type: "document",
	icon: CogIcon,
	fields: [
		defineField({
			name: "organization",
			title: "Organization",
			type: "object",
			description:
				"Organization information is used in JSON-LD Organization schema on the homepage for SEO",
			fields: [
				defineField({
					name: "name",
					title: "Organization Name",
					type: "string",
					initialValue: "Engine Digital",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "description",
					title: "Description",
					type: "text",
					description: "Brief description of the company for search engines",
				}),
				defineField({
					...logo,
					// alt not needed
					fields: [],
				}),
				defineField({
					name: "foundingDate",
					title: "Founding Date",
					type: "string",
					description: "When the company was founded",
				}),
				defineField({
					name: "industry",
					title: "Industry",
					type: "string",
					initialValue: "Cybersecurity",
				}),
				defineField({
					name: "contactPhone",
					title: "Contact Phone",
					type: "string",
					description: "Main contact phone number",
				}),
				defineField({
					name: "contactEmail",
					title: "Contact Email",
					type: "string",
					description: "General contact email address",
				}),
				defineField({
					name: "headquarters",
					title: "Headquarters Address",
					type: "text",
					description: "Main office address",
				}),
				defineField({
					name: "image",
					type: "image",
					title: "Image",
					description:
						"Link share fallback image for when none is present in the page",
				}),
				defineField({
					name: "socialMediaUrls",
					title: "Social Media URLs",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								{
									name: "platform",
									title: "Platform",
									type: "string",
									options: {
										list: [
											"LinkedIn",
											"Twitter",
											"Facebook",
											"YouTube",
											"GitHub",
										],
										layout: "dropdown",
									},
								},
								{
									name: "url",
									title: "URL",
									type: "url",
								},
							],
							preview: {
								select: {
									platform: "platform",
									url: "url",
								},
								prepare({ platform, url }) {
									return {
										title: platform,
										subtitle: url,
									};
								},
							},
						},
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "name",
		},
		prepare({ title }) {
			return {
				title: "Organization",
				subtitle: title,
			};
		},
	},
});
