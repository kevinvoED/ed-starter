import type { QueryParams } from "next-sanity";
import { cookies, draftMode } from "next/headers";
import {
  defineLive,
  type LivePerspective,
  resolvePerspectiveFromCookies,
} from "next-sanity/live";
import { client } from "./client";
import { token } from "./token";

/*
 * Sanity Live
 * @docs: https://www.sanity.io/docs/developer-guides/live-content-guide#k19100a1e7fc9
 */

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
  strict: true,
});

export interface DynamicFetchOptions {
  perspective: LivePerspective;
  stega: boolean;
}

/*
 * Resolves perspective and stega outside a 'use cache' boundary so they can be
 * passed in as plain props. Calls draftMode() and cookies(), which are dynamic
 * APIs — must be called from a Suspense boundary or a route with a loading.tsx.
 */
export async function getDynamicFetchOptions(): Promise<DynamicFetchOptions> {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return { perspective: "published", stega: false };
  }

  const jar = await cookies();
  const perspective = await resolvePerspectiveFromCookies({ cookies: jar });

  return { perspective: perspective ?? "drafts", stega: true };
}

/*
 * For use inside generateStaticParams only.
 * Always fetches published content with stega disabled.
 */
export async function sanityFetchStaticParams<
  const QueryString extends string,
>({ query, params = {} }: { query: QueryString; params?: QueryParams }) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective: "published",
    stega: false,
  });

  return { data };
}

/*
 * For use inside generateMetadata, generateViewport, sitemap.ts,
 * robots.ts, opengraph-image.tsx, etc.
 * Always disables stega; perspective must be resolved via getDynamicFetchOptions.
 */
export async function sanityFetchMetadata<const QueryString extends string>({
  query,
  params = {},
  perspective,
}: {
  query: QueryString;
  params?: QueryParams;
  perspective: LivePerspective;
}) {
  "use cache";

  const { data } = await sanityFetch({
    query,
    params,
    perspective,
    stega: false,
  });

  return { data };
}
