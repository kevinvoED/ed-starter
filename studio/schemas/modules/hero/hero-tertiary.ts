import { toPlainText } from "@portabletext/react";
import { DashboardIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import {
  eyebrow,
  links,
  ptDescription,
  ptTitleHighlight,
  ptTitleHighlightLineBreak,
} from "@/schemas/sharedFields";

export default defineType({
  name: "hero-tertiary",
  title: "Hero Tertiary",
  type: "object",
  icon: DashboardIcon,
  fields: [
    defineField({
      name: "lottieAnimation",
      title: "Lottie Animation",
      description: "Select the animation to display in the hero",
      type: "string",
      options: {
        list: [
          { title: "API", value: "API" },
          { title: "Comparison", value: "Comparison" },
          { title: "Data Centre", value: "DataCentre" },
          { title: "Data Feeds", value: "DataFeeds" },
          { title: "Explore Data", value: "ExploreData" },
          { title: "Geo Location", value: "GeoLocation" },
          { title: "Integrations", value: "Integrations" },
          { title: "On Prem", value: "OnPrem" },
          { title: "Residential Proxy", value: "ResidentialProxy" },
          { title: "Session Enrichment", value: "SessionEnrichment" },
          { title: "VPN Detection", value: "VPNDetection" },
        ],
      },
      initialValue: "API",
      validation: (Rule) => Rule.required(),
    }),
    eyebrow,
    ptTitleHighlightLineBreak,
    ptDescription,
    links,
    defineField({
      ...ptTitleHighlight,
      name: "contentTitle",
      title: "Content title",
      description: "The smaller title that is shown before the content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contentBlocks",
      title: "Content Blocks",
      type: "array",
      of: [
        { type: "text-2-col" },
        { type: "list-text" },
        { type: "portable-text-content-highlight" },
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewImageUrl: (block) => `/schemas/previews/${block}.jpg`,
            },
            { name: "list" },
          ],
        },
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: "Hero Tertiary",
        subtitle: toPlainText(title),
      };
    },
  },
});
