/** @type {import('next').NextConfig} */

import getRewritesAndRedirects from './sanity/lib/rewrites-and-redirects.mjs';

const nextConfig = {
  env: {
    SC_DISABLE_SPEEDY: 'false',
  },
  async redirects() {
    const { redirects: dynamicRedirects } = await getRewritesAndRedirects();

    const redirects = [
      {
        source: '/index',
        destination: '/',
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
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
