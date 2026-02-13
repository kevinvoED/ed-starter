/** @type {import('next').NextConfig} */

import cspHeader from "./csp.config.mjs";
import getRewritesAndRedirects from "./sanity/lib/get-rewrites-and-redirects.mjs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  /** @see https://nextjs.org/docs/app/api-reference/config/next-config-js/headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        /** @see https://nextjs.org/docs/app/guides/content-security-policy#without-nonces */
        headers: [
          /** @todo validate the CORS settings */
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Cookie, Date, Origin, Set-Cookie, X-Api-Version",
          },
          /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy */
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security */
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection */
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control */
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          cspHeader,
        ],
      },
    ];
  },
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
