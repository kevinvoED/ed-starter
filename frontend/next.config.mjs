/** @type {import('next').NextConfig} */

import getRewritesAndRedirects from "./sanity/lib/get-rewrites-and-redirects.mjs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  async redirects() {
    const { redirects: dynamicRedirects } = await getRewritesAndRedirects();

    const redirects = [
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
    ];

    return [...redirects, ...dynamicRedirects];
  },
  async rewrites() {
    const { rewrites } = await getRewritesAndRedirects();

    return rewrites;
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    qualities: [75, 100],
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
};

export default nextConfig;
