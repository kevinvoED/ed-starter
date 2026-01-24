/** @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml */

import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlQuery } from "@/sanity/queries/shared/link";
import { VIEWABLE_TYPES } from "@/lib/utils";

/** A single query that can fetch all the documents that have a viewable url/page  */
const SITEMAP_QUERY = groq`
  *[_type in $viewableTypes && !meta.noindex && defined(slug)] {
    ${urlQuery},
    "lastModified": _updatedAt,
    "changeFrequency": select(_type == "page" => "daily", "weekly"),
    "priority": select(
      slug.current == "index" => 1,
      _type == "page" => 0.5,
      0.7
    ),
    // look for hero-like blocks and grab their first image as the images for this item
    // in order to append the width limit, we need to unpack the image urls
    "images": select(
      blocks[0]._type match "hero*" && defined(blocks[0].image) => blocks[0]{
        "images": array::compact([image.asset->{ "url": url + "?w=800&amp;fit=max" }.url, null])
      }.images, null),
    // TODO: if there are videos in blocks, we can add those here with a similar query
    "videos": null
  // search engines do not prioritize URLs based on their position within the sitemap file
  // so we can just use the URL and the priority to have the homepage at the top at least
  } | order(slug.current, priority desc)
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
  const { data } = await sanityFetch({
    query: SITEMAP_QUERY,
    params: {
      baseUrl: process.env.NEXT_PUBLIC_SITE_URL!,
      viewableTypes: Array.from(VIEWABLE_TYPES),
    },
  });

  return data || [];
}
