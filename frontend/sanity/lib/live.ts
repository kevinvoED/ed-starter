import { defineLive } from "next-sanity/live";
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
});
