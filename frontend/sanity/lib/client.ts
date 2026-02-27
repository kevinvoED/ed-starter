import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "./env";

// Disable stega for specific field names that commonly need cleaning
const fieldsToDisableStega = [
  "text", // PortableText text nodes
  "children", // PortableText children arrays
  "title",
  "description",
  "content",
];

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_STUDIO_URL,
    filter: (props) => {
      if (fieldsToDisableStega.includes(props.sourcePath.at(-1) as string)) {
        return false;
      }

      return props.filterDefault(props);
    },
  },
});
